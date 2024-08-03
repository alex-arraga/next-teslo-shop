'use client'

import { useState } from "react"
import { Product, Size } from "@/interfaces"
import { SizeSelector, QuantitySelector } from "@/components"

interface Props {
  product: Product
}

export const AddProduct = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false)


  const addToCart = () => {
    setPosted(true)
    if (!size) return;
    console.log({ size, quantity })
  }


  return (
    <>
      {
        posted && !size && (
          <p className="text-red-600 font-medium text-sm fade-in bg-red-50 p-2 mb-4 rounded w-fit">
            * Seleccione una talla
          </p>
        )
      }

      {/* Selector de Tallas */}
      <SizeSelector
        availableSizes={product.sizes!}
        selectedSize={size}
        onSizeChanged={setSize}
      />


      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        className="mb-8"
        onQuantityChanged={setQuantity}
      />


      {/* Button */}
      <button
        className="btn-primary mb-6"
        onClick={addToCart}
      >
        Agregar al carrito
      </button>

    </>
  )
}