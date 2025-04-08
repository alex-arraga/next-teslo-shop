'use client'

import { useEffect, useState } from "react";

import Link from "next/link";
import { ProductImage, QuantitySelector } from '@/components';

import { IoCloseCircleOutline, IoCloseOutline, IoTrashOutline } from "react-icons/io5";
import { currencyFormat } from "@/utils";
import { useCartStore } from "@/store";


export const ProductsInCart = () => {
  const [loading, setloading] = useState(false)

  // Store
  const productsInCart = useCartStore(store => store.cart)
  const updateQuantity = useCartStore(store => store.updateProductQuantity)
  const removeProduct = useCartStore(store => store.removeProduct)

  useEffect(() => {
    setloading(true)
  }, [])

  if (!loading) {
    return <p>Loading...</p>
  }


  return (
    <div className="w-full">
      {
        productsInCart.map((product) => (
          <div
            key={`${product.slug}-${product.size}`}
            className="relative flex p-3 sm:p-4 bg-gray-50 dark:bg-neutral-700 shadow-lg dark:shadow-neutral-950 rounded-lg my-2"
          >
            <ProductImage
              src={product.images}
              alt={product.title}
              width={100}
              height={100}
              className="rounded object-contain w-20 h-20 sm:h-28 sm:w-28 mr-2 md:mr-4"
            />

            <div className="flex flex-col w-full">
              <Link
                href={`/product/${product.slug}`}
                className="flex flex-col justify-between cursor-default"
              >
                <h2 className="text-sm md:text-lg hover:text-blue-700 cursor-pointer dark:hover:text-blue-300 transition-all font-bold overflow-auto max-w-sm md:mr-10 w-fit">
                  {product.title}
                </h2>

                <div className="mt-2 flex items-center w-full h-fi cursor-default">
                  <p className="text-xs sm:text-sm font-normal text-gray-800 dark:text-gray-300">
                    Talla: <span className="font-medium">{product.size}</span>
                  </p>

                  <p className="ml-4 sm:ml-6 text-xs sm:text-sm font-normal text-gray-800 dark:text-gray-300">
                    Precio: <span className="font-medium">{currencyFormat({ value: product.price, country: "United States", minFractionDigis: 0 })}</span>
                  </p>
                </div>
              </Link>

              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={quantity => updateQuantity(product, quantity)}
              />

              {/* Delete button */}
              <button
                onClick={() => removeProduct(product)}
                className="block"
              >
                <IoCloseCircleOutline
                  size={20}
                  className="absolute dark:hover:text-red-400 hover:text-red-500 h-4 w-4 sm:h-5 sm:w-5 cursor-pointer top-3 right-3 sm:top-4 sm:right-4 dark:font-black"
                />
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}