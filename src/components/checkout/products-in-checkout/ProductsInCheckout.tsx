'use client'

import { useEffect, useState } from "react";
import Image from "next/image"

import { currencyFormat } from "@/utils";
import { useCartStore } from "@/store";


export const ProductsInCheckout = () => {
  const [loading, setloading] = useState(false)

  // Store
  const productsInCart = useCartStore(store => store.cart);

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
            className="flex p-3 md:p-4 items-center bg-gray-50 dark:bg-neutral-700 shadow-lg dark:shadow-neutral-950 rounded-lg my-2"
          >
            <Image
              src={`/products/${product.images}`}
              alt={product.title}
              width={100}
              height={100}
              className="rounded object-contain w-20 h-20 sm:h-28 sm:w-28 mr-2 md:mr-4"
            />

            <div className="flex flex-col w-full gap-2">
              <h2 className="font-semibold text-blue-900 dark:text-blue-200 text-sm md:text-lg overflow-auto max-w-sm md:mr-10 w-full">
                {product.title}
              </h2>

              <div>
                <div className="flex gap-6 text-xs sm:text-sm md:text-base">
                  <p className="font-normal text-gray-800 dark:text-gray-300">Talla: {product.size}</p>

                  <p className="text-xs sm:text-sm md:text-base font-bold">
                    Precio: <span className="text-gray-800 dark:text-gray-300">{currencyFormat({ value: product.price, country: "United States", })}</span>
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2 bg-blue-50 dark:bg-gray-800 dark:text-gray-300 rounded p-1">
                  <p className="text-xs sm:text-sm md:text-base">
                    Unidades: <span className="font-semibold">{product.quantity}</span>
                  </p>

                  <p className="mr-2 font-bold text-xs dark:text-white sm:text-sm md:text-base">
                    {'Total: '}
                    <span>
                      {
                        currencyFormat({
                          country: 'United States',
                          value: product.quantity * product.price
                        })
                      }
                    </span>
                  </p>

                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}