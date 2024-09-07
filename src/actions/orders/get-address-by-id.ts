'use server'

import prisma from "@/lib/prisma"

export const getAddressByOrderId = async (orderId: string) => {
  try {
    const address = await prisma.orderAddress.findFirst({
      where: { orderId }
    })

    if (!address) throw new Error('Address not found');
    
    return {
      ok: true,
      address
    }

  } catch (error) {
    return {
      ok: false,
      message: error
    }
  }
}