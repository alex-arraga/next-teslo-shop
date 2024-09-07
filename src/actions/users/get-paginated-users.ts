'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getPaginatedUsers = async () => {
  try {
    const session = await auth();

    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        message: 'No puede acceder a este recurso'
      }
    }

    const users = await prisma.user.findMany({
      orderBy: { name: 'desc' },
      include: {
        address: {
          select: {
            city: true,
            country: { select: { name: true } },
            phone: true,
          }
        }
      }
    })

    if (!users) {
      return {
        ok: false,
        message: '500 - No se pudieron cargar los datos de los usuarios'
      }
    }

    return {
      ok: true,
      users: users
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error: Usuarios no encontrados'
    }
  }
}