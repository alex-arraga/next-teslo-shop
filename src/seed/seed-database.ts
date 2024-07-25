import { initialData } from "./seed";
import prisma from '../lib/prisma'

interface abc {
  example: string
}

async function main() {
  // 1. Delete all records
  await prisma.productImage.deleteMany()
  await prisma.category.deleteMany()
  await prisma.product.deleteMany()

  // 2. Insert categories
  const { categories, products } = initialData;

  const categoryData = categories.map(category => ({ name: category }))

  await prisma.category.createMany({
    data: categoryData
  })

  console.log('Seed successfully executed')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})();