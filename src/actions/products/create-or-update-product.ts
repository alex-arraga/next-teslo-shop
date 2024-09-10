'use server'

import prisma from '@/lib/prisma'
import { Gender, Product, Size } from '@prisma/client'

import { revalidatePath } from 'next/cache'
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
    .transform(value => value.split(',')),
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

  const dataProduct = check.data;

  const { id, ...rest } = dataProduct;

  try {

    // ? If throw an error, rollback changes
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;

      const tagsArray = rest.tags.split(',').map(t => t.trim().toLowerCase());

      if (id) {
        // Update product data
        product = await tx.product.update({
          where: { id: id },
          data: {
            ...rest,
            tags: {
              set: tagsArray
            },
            sizes: {
              set: rest.sizes as Size[]
            }
          }
        })

      } else {
        // Create new product
        product = await tx.product.create({
          data: {
            ...rest,
            tags: {
              set: tagsArray
            },
            sizes: {
              set: rest.sizes as Size[]
            }
          }
        })
      }

      // Load and save images
      console.log(formData.getAll('images'))

      // Revalidate affected paths
      revalidatePath(`/admin/product/${product.slug}`);
      revalidatePath('/admin/products');

      // TODO: revalidatePath(`/admin/products/${product.slug}`)

      return { product }
    })


    return {
      ok: true,
      product: prismaTx.product
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: '500 - Error creando/actualizando un producto'
    }
  }
}