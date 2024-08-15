import { initialData } from "./seed";
import { countries } from './seed-countries';
import prisma from '../lib/prisma'

interface abc {
  example: string
}

async function main() {
  try {
    // 1. Delete all records
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    await prisma.user.deleteMany()

    await prisma.countries.deleteMany()

    // 2. Get initial data
    const { categories, products, users } = initialData;

    // 3. Insert users
    await prisma.user.createMany({
      data: users
    });


    // 4. Insert categories
    const categoryData = categories.map(category => ({ name: category }))

    await prisma.category.createMany({
      data: categoryData
    })

    // 4.1 Relation category-product
    const categoriesDB = await prisma.category.findMany()

    const categoriesMap = categoriesDB.reduce((map, category) => {
      map[category.name] = category.id

      return map
    }, {} as Record<string, string>); // <string: shirt, string: uuid>


    // 5. Insert products and images
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

    // 6. Insert countries
    await prisma.countries.createMany({ data: countries })

    console.log('Seed successfully executed')

  } catch (error) {
    
    console.log(error)
    throw new Error('Seed error')
  }
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})();