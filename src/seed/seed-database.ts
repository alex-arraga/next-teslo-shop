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


  // 3. Insert products
  // const { type, images, ...product1 } = products[0];

  // await prisma.product.create({
  //   data: {
  //     ...product1,
  //     categoryId: categoriesMap['shirts']
  //   }
  // })

  products.map(async (product) => {
    const { type, images, ...rest } = product;

    await prisma.product.createMany({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })
  })

  console.log('Seed successfully executed')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})();