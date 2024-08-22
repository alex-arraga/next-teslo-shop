'use server'

import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id }
    })

    if(!order) throw new Error(`The order: ${id} not exist`)

    return {
      ok: true,
      order
    }
    
  } catch (error) {
    return {
      ok: false,
      message: error
    }
  }
}