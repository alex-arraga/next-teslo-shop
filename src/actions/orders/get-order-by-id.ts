'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('Debe estar autenticado para acceder a una orden de compra')
    };

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        // Relation: Order - OrderItem
        OrderItem: {
          select: {
            productId: true,
            quantity: true,
            price: true,
            size: true,

            // Relation: OrderItem - Product
            product: {
              select: {
                title: true,
                slug: true,
                gender: true,

                // Relation: Product - ProductImage
                ProductImage: {
                  take: 1,
                  select: {
                    url: true
                  },
                }
              }
            }
          }
        },
        // Relation: Order - OrderAddress
        OrderAddress: {
          include: {
            country: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    if (!order) throw new Error(`La orden: ${id} no existe`);

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw new Error(`La orden no corresponde con el user: ${session.user.id}`)
      }
    }


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