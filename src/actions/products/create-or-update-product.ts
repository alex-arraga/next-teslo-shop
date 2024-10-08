'use server'

import prisma from '@/lib/prisma'
import { Gender, Product, Size } from '@prisma/client'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { v2 as cloudinary } from 'cloudinary';

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
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[])

        if (!images) throw new Error('No se obtuvieron las imagenes, rollback');

        await tx.productImage.createMany({
          data: images.map(img => ({
            url: img!,
            productId: product.id
          }))
        })
      }

      return { product }

    }, {
      maxWait: 5000, // default: 2000 ms - 2 seg
      timeout: 25000 // default: 5000 ms - 5 seg
    })

    const { slug } = prismaTx.product;

    // Revalidate affected paths
    const pathsToRevalidate = [
      `/product/${slug}`,
      `/admin/product/${slug}`,
      '/admin/products'
    ];

    await Promise.all(pathsToRevalidate.map(path => revalidatePath(path)));

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


const uploadImages = async (images: File[]) => {
  cloudinary.config(process.env.CLOUDINARY_URL ?? '')

  try {
    const uploadPromises = images.map(async (img) => {
      try {
        const buffer = await img.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
          .then(res => res.secure_url)

      } catch (error) {
        console.log(error)
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)

    return uploadedImages

  } catch (error) {
    console.log(error)
    return null
  }
}