'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrdersBySessionUser = async () => {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('Debe estar autenticado para ver sus ordenes')
    }

    const userId = session.user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
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