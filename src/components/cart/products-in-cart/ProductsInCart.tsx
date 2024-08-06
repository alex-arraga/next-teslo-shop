'use client'

import { useEffect, useState } from "react";

import Image from "next/image"
import Link from "next/link";
import { QuantitySelector } from '@/components';

import { IoTrashOutline } from "react-icons/io5";
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
            className="flex p-4 bg-gray-50 rounded-lg my-2"
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
              <Link
                href={`/product/${product.slug}`}
                className="flex flex-col md:flex-row justify-between"
              >
                <h2 className="hover:text-blue-700 transition-all font-bold text-sm md:text-lg overflow-auto max-w-sm md:mr-10 w-full">
                  {product.size} - {product.title}
                </h2>
                <p className="text-sm md:text-base font-semibold">${product.price.toLocaleString()}</p>
              </Link>

              <QuantitySelector
                quantity={product.quantity}
                className="mb-4 text-sm md:text-base"
                onQuantityChanged={quantity => updateQuantity(product, quantity)}
              />

              <button
                onClick={() => removeProduct(product)}
                className="flex items-center text-sm md:text-base gap-1 text-gray-500 hover:text-red-400 w-fit hover:font-semibold transition-all"
              >
                <IoTrashOutline size={20} />
                Remover
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}