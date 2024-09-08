'use server'

import prisma from "@/lib/prisma"

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany()

    return {
      ok: true,
      categories: categories
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: '500 - No se pudieron obtener las categorias'
    }
  }
}