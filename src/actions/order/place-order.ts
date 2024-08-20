'use server'

import prisma from "@/lib/prisma"
import { auth } from "@/auth.config"
import type { Address, Order, Size } from "@/interfaces"

interface ProductToOrder {
  productId: string,
  quantity: number,
  size: Size
}


export const placeOrder = async (productsInOrder: ProductToOrder[], address: Address) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return {
        ok: false,
        message: 'Error: userId not exist'
      }
    }

    // Obtener info de los productos
    // Pueden haber +2 productos con el mismo id pero diferente size

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsInOrder.map(p => p.productId)
        }
      }
    });

    // Total items in order
    const itemsInOrder = productsInOrder.reduce((count, p) => count + p.quantity, 0)


    // Variables para calculo de montos
    let subTotal = 0;
    let tax = 0;
    let total = 0;

    // Cálculo de montos
    for (const item of productsInOrder) {
      const product = products.find(p => p.id === item.productId);

      if (!product) {
        throw new Error(`${item.productId} not exist - 500`);
      }

      const itemSubTotal = product.price * item.quantity;
      subTotal += itemSubTotal;
      tax += itemSubTotal * 0.15;
      total += itemSubTotal * 1.15;
    }


    // Crear la transacción de base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos

      // 2. Crear la orden
      const newOrder = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          tax: tax,
          subTotal: subTotal,
          total: total,

          OrderItem: {
            createMany: {
              data: productsInOrder.map((p) => ({
                productId: p.productId,
                quantity: p.quantity,
                size: p.size,
                price: products.find((product) => product.id === p.productId)?.price ?? 0
              }))
            }
          }
        }
      })

      if (!newOrder) throw new Error('Error creating new order');


      // 3. Crear la dirección de la orden

      // ? Warn: I can't use spread operator due to an error of propagation
      // const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2,
          city: address.city,
          postalCode: address.postalCode,
          countryId: address.country,
          phone: address.phone,

          orderId: newOrder.id
        }
      })

      if (!orderAddress) throw new Error('Error creating order address')

      return {
        order: newOrder,
        updatedProducts: [],
        orderAddress: orderAddress
      }
    })



    return 'Todo ok'


  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error placing order'
    }
  }
}