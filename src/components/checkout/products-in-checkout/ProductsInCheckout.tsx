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
            className="flex p-4 items-center bg-gray-50 rounded-lg my-2"
          >
            <Image
              src={`/products/${product.images}`}
              alt={product.title}
              width={120}
              height={120}
              className="rounded object-contain mr-4"
              style={{
                width: '100px',
                height: '100px'
              }}
            />

            <div className="flex flex-col w-full">
              <h2 className="font-semibold text-blue-900 text-sm md:text-lg overflow-auto max-w-sm md:mr-10 w-full">
                {product.size} - {product.title}
              </h2>

              <p className="text-sm md:text-base font-bold">
                {currencyFormat({
                  value: product.price,
                  country: "United States",
                })}
              </p>

              <div className="flex justify-between items-center mt-2 bg-blue-50 rounded p-1">
                <p>
                  Unidades: <span className="font-semibold">{product.quantity}</span>
                </p>

                <p className="mr-2 font-bold">

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
        ))
      }
    </div>
  )
}