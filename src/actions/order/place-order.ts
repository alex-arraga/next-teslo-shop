'use server'

import { auth } from "@/auth.config"
import type { Address, Size } from "@/interfaces"

interface ProductToOrder {
  productId: string,
  quantity: number,
  size: Size
}


export const placeOrder = async (productsInOrder: ProductToOrder[], address: Address) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return {
        ok: false,
        message: 'Error: userId not exist'
      }
    }

    console.log({ products: productsInOrder, address, userId })
    return 'Todo ok'


  } catch (error) {
    return {
      ok: false,
      message: 'Error placing order'
    }
  }
}