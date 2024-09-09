'use server'

import { Gender } from '@prisma/client'
import { z } from 'zod'


const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(value => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform(value => Number(value.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string()
    .transform(value => value.trim()),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})


export const createOrUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  // Zod validation
  const check = productSchema.safeParse(data);

  if (!check.success) {
    console.log(check.error)
    return {
      ok: false,
    }
  }

  console.log(check.data)

  return {
    ok: true,
  }
}