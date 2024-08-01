'use server'

// import { sleep } from "@/utils";
import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {

  // await sleep(3)

  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug: slug
      },
      select: {
        inStock: true
      }
    })

    if (!stock) return 0;

    return stock.inStock

  } catch (error) {
    console.log(error)
    return 0
  }

}