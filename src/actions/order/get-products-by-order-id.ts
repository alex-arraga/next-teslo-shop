'use server'

import { OrderedProduct } from "@/interfaces";
import prisma from "@/lib/prisma"

export const getProductsByOrderId = async (orderId: string) => {
  try {
    const productsInOrder = await prisma.orderItem.findMany({
      where: { orderId },
      select: {
        productId: true,
        size: true
      }
    })

    if (!productsInOrder) throw new Error('No se encontraron productos');

    // Variable to send
    let products: OrderedProduct[] = [];


    for (const item of productsInOrder) {
      const { size, productId } = item;

      const dataProduct = await prisma.product.findFirst({
        where: {
          id: productId
        },

        include: {
          ProductImage: {
            select: {
              url: true
            },
          },
        },
      })

      if (!dataProduct) throw new Error('No se pudo traer la data de los productos');

      // Slice array of sizes and ProductImage
      const { sizes: _, ProductImage: __, ...restData } = dataProduct;

      products.push({
        ...restData,
        size,
        images: dataProduct.ProductImage.map(img => img.url)
      })
    };


    return {
      ok: true,
      products
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Products by order not found'
    }
  }
}