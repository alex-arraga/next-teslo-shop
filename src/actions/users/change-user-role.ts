'use server'

import prisma from "@/lib/prisma"
import { auth } from "@/auth.config"
import { revalidatePath } from "next/cache"

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'No puede acceder a este recurso'
    }
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user'

    // Update user role
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    })

    revalidatePath('/admin/users')

    return {
      ok: true
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: `500 - No se pudo actualizar el rol del usuario ${userId}`
    }
  }
}