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
            className="relative flex p-2 sm:p-4 bg-gray-50 dark:bg-neutral-700 shadow-lg dark:shadow-neutral-950 rounded-lg my-2"
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
                className="flex flex-col md:flex-row justify-between"
              >
                <h2 className="text-sm md:text-lg hover:text-blue-700 dark:hover:text-blue-300 transition-all font-bold overflow-auto max-w-sm md:mr-10 w-full">
                  {product.title}
                </h2>

                <div className="mt-2 flex items-center w-full h-fit">
                  <p className="text-xs sm:text-sm font-normal text-gray-300">
                    Talla: {product.size}
                  </p>

                  <p className="ml-4 sm:ml-6 text-xs sm:text-sm md:text-base font-normal text-gray-300">
                    Precio: {currencyFormat({ value: product.price, country: "United States", minFractionDigis: 0 })}
                  </p>
                </div>
              </Link>

              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={quantity => updateQuantity(product, quantity)}
              />

              {/* Delete button on tablets or laptops */}
              <button
                onClick={() => removeProduct(product)}
                className="hidden sm:flex items-center text-xs sm:text-sm md:text-base gap-1 text-gray-500 dark:text-gray-300 hover:text-red-400 w-fit hover:font-semibold transition-all"
              >
                <IoTrashOutline size={20} className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                Remover
              </button>

              {/* Delete button on mobile */}
              <button
                onClick={() => removeProduct(product)}
                className="block sm:hidden"
              >
                <IoCloseCircleOutline size={20} className="absolute h-4 w-4 sm:hidden cursor-pointer top-2 right-2 font-bold" />
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}