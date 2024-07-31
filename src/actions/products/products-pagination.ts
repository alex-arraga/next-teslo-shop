'use server'

import { Gender } from "@/interfaces"
import prisma from "@/lib/prisma"

interface PaginationsOptions {
  page?: number
  take?: number
  gender?: Gender
}

export async function getPaginatedProductWithImages({ page = 1, take = 12, gender }: PaginationsOptions) {
  if (page <= 0) page = 1;
  if (isNaN(page)) page = 1;

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      skip: (page - 1) * take,
      take: take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      //! Filtrar productos por genero
      where: {
        gender: gender
      }
    })

    // 2. Obtener el total de paginas
    const totalProducts = await prisma.product.count({
      where: {
        gender: gender
      }
    });

    const totalPages = Math.ceil(totalProducts / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map(product => ({
        ...product,
        images: product.ProductImage.map(image => image.url)
      })),
    }

  } catch (error) {
    throw new Error('Error al cargar los productos')
  }

}