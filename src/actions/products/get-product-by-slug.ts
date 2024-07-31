'use server'

import prisma from "@/lib/prisma"


export const getProductBySlug = async (slug: string) => {

  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: slug
      },
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      }
    })

    if (!product) return null;

    return {
      ...product,
      images: product?.ProductImage.map(image => image.url)
    }

  } catch (error) {
    console.log(error)
    throw new Error('No se pudo cargar el producto por su slug')
  }

}