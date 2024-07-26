import { initialData } from "./seed";
import prisma from '../lib/prisma'

interface abc {
  example: string
}

async function main() {
  // 1. Delete all records
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // 2. Insert categories
  const { categories, products } = initialData;

  const categoryData = categories.map(category => ({ name: category }))

  await prisma.category.createMany({
    data: categoryData
  })

  // 2.1 Relation category-product
  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name] = category.id

    return map
  }, {} as Record<string, string>); // <string: shirt, string: uuid>


  // 3. Insert products and images
  products.forEach(async (product) => {

    const { type, images, ...rest } = product;

    // products
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    });

    // images
    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    });

  })

  console.log('Seed successfully executed')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})();