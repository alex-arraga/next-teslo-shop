'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getPaginatedOrders = async () => {
  try {
    const session = await auth();

    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        message: 'No puede acceder a este recurso'
      }
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        OrderAddress: true
      }
    })

    return {
      ok: true,
      orders: orders
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error: Ordenes no encontradas'
    }
  }
}