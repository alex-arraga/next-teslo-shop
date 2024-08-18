'use server'

import type { Address } from "@/interfaces"
import prisma from "@/lib/prisma"


export const setUserAddress = async (address: Address, userId: string) => {
  try {
    await createOrUpdateAddress(address, userId)

    return {
      ok: true,
      address
    }
  } catch (error) {
    console.log(error)
  }
}


const createOrUpdateAddress = async (address: Address, userId: string) => {
  try {
    const getUserAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    const addressToSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      city: address.city,
      phone: address.phone,
      postalCode: address.postalCode,
      countryId: address.country
    }

    if (!getUserAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId: userId
      },
      data: addressToSave
    })

    return updatedAddress


  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo guardar la dirección del usuario'
    }
  }
}