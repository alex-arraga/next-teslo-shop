'use server'

import prisma from "@/lib/prisma"
import { auth } from "@/auth.config"
import type { Address, Size } from "@/interfaces"

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

    console.log({ subTotal, tax, total });



    return 'Todo ok'


  } catch (error) {
    return {
      ok: false,
      message: 'Error placing order'
    }
  }
}