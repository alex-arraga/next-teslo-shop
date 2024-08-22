'use client'

import { useEffect, useState } from "react";
import Image from "next/image"

import { currencyFormat, labels } from "@/utils";
import type { OrderedItems } from "@/interfaces";

interface Props {
  orderItem: OrderedItems[]
}


export const OrderedProducts = ({ orderItem }: Props) => {
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setloading(true)
  }, [])

  if (!loading) {
    return <p>Loading...</p>
  }


  return (
    <div className="w-full">
      {
        orderItem.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex p-4 items-center bg-gray-100 rounded-lg mt-4"
          >
            <Image
              src={`/products/${item.product.ProductImage[0].url}`}
              alt={item.product.title}
              width={120}
              height={120}
              className="rounded object-contain mr-4"
              style={{
                width: '100px',
                height: '100px'
              }}
            />

            <div className="flex flex-col w-full">

              <p className="capitalize">
                {labels[item.product.gender]}
              </p>

              <h2 className="font-semibold text-blue-900 text-sm md:text-lg overflow-auto max-w-sm md:mr-10 w-full">
                {item.size} - {item.product.title}
              </h2>

              <p className="text-sm md:text-base font-bold">
                {
                  currencyFormat({
                    value: item.price,
                    country: "United States"
                  })
                }

                <span className="font-medium"> x {item.quantity} art.</span>
              </p>

            </div>
          </div>
        ))
      }
    </div>
  )
}