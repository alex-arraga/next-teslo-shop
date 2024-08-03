'use client'

import { useState } from "react"
import type { CartProduct, Product, Size } from "@/interfaces"
import { SizeSelector, QuantitySelector } from "@/components"

import { useCartStore } from "@/store"

interface Props {
  product: Product
}

export const AddProduct = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false)

  // Cart Store
  const addProductCart = useCartStore(state => state.addProductToCart)


  const addToCart = () => {
    setPosted(true)
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      slug: product.slug,
      quantity: quantity,
      size: size,
      images: product.images[0]
    }

    addProductCart(cartProduct)

    // Reset purchase
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
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