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


  const addToCart = () => {
    if(!size) return;
    console.log({size, quantity})
  }


  return (
    <>

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