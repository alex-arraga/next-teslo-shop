'use server'

import prisma from "@/lib/prisma"

export async function getPaginatedProductWithImages() {
  
  try {
    const products = await prisma.product.findMany({
      take: 12,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      }
    })


    return {
      products: products.map(product => ({
        ...product,
        images: product.ProductImage.map(image => image.url)
      })),
    }

  } catch (error) {
    throw new Error('Error al cargar los productos')
  }

}