'use client'

import { Product } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0])

  const validImg = displayImage ? `/products/${displayImage}` : '/imgs/placeholder.jpg'

  return (
    <div className="max-w-64 sm:max-w-none rounded-md overflow-hidden fade-in bg-neutral-200 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-lg shadow-neutral-400 dark:bg-neutral-700 dark:shadow-neutral-950 hover:scale-105 hover:duration-300">

      <Link href={`/product/${product.slug}`}>
        <Image
          src={validImg}
          alt={product.title}
          className="object-cover w-full max-h-72 sm:max-h-64 md:max-h-96 xl:max-h-[450px]"
          width={450}
          height={450}
          priority
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>


      <div className="p-3 sm:p-4 flex flex-col">
        <Link
          className="text-sm xl:text-base font-light hover:font-normal duration-300"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <span className="text-sm xl:text-base font-bold mt-2">$ {product.price}</span>
      </div>


    </div>
  )
}