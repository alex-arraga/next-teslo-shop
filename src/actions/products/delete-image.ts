'use server'

import prisma from "@/lib/prisma"
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";

export const deleteImage = async (imageId: number, imageUrl: string) => {
  cloudinary.config(process.env.CLOUDINARY_URL ?? '')

  const isCloudinaryImage = imageUrl.startsWith('http');
  const nameImage = imageUrl.split('/').at(-1)?.split('.')[0] || '';

  try {

    // If the image isn't from Cloudinary, not allow delete 
    if (!isCloudinaryImage) {
      return {
        ok: false,
        message: '500 - La imagen no proviene de Cloudinary'
      }
    }

    // Delete image in Cloudinary
    await cloudinary.uploader.destroy(nameImage);

    // Delete image in DB and get product slug
    const deleteDb = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    if (!deleteDb?.product.slug) {
      return {
        ok: false,
        message: '500 - No se encontro un slug'
      }
    }

    const { slug } = deleteDb.product;

    const pathsToRevalidate = [
      `/product/${slug}`,
      `/admin/product/${slug}`,
      '/admin/products'
    ]

    await Promise.all(pathsToRevalidate.map(path => revalidatePath(path)));


    return {
      ok: true,
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: error
    }
  }
}


// const getProductSlug = await prisma.productImage.findFirst({
//   where: { id: imageId },
//   select: {
//     product: {
//       select: {
//         slug: true
//       }
//     }
//   }
// })