'use server'

import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {
  try {
    const hasOrder = await prisma.order.findUnique({
      where: { id }
    })

    if(!hasOrder) throw new Error(`The order: ${id} not exist`)

    return {
      ok: true,
      message: 'Order is ok'
    }
    
  } catch (error) {
    return {
      ok: false,
      message: error
    }
  }
}