import { initialData } from "./seed";
import prisma from '../lib/prisma'

interface abc {
  example: string
}

async function main() {
  // Delete all records
  await prisma.productImage.deleteMany()
  await prisma.category.deleteMany()
  await prisma.product.deleteMany()

  console.log('Seed successfully executed')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})();