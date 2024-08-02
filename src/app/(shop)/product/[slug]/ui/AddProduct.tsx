'use client'

import { useState } from "react"
import { Product, Size } from "@/interfaces"
import { SizeSelector, QuantitySelector } from "@/components"

interface Props {
  product: Product
}

export const AddProduct = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();


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
        quantity={3}
        className="mb-8"
      />


      {/* Button */}
      <button className="btn-primary mb-6">
        Agregar al carrito
      </button>

    </>
  )
}