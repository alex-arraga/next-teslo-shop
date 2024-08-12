'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs';

interface Params {
  name: string,
  email: string,
  password: string
}

export const registerUser = async ({ email, name, password }: Params) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return {
      ok: true,
      message: 'Nuevo usuario registrado',
      user: newUser
    }

  } catch (error) {
    console.log({ error })

    return {
      ok: false,
      message: 'No se pudo registrar el usuario'
    }
  }
}