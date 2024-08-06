'use client'

import { useCartStore } from "@/store"
import { useEffect, useState } from "react"

import { currencyFormat } from '@/utils/currencyFormat';


export const SummaryOrderCart = () => {
  const {
    subTotal,
    tax,
    total,
    totalItems } = useCartStore(state => state.getSummaryInformation())

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <div className="flex justify-center items-center bg-gray-100 w-full animate-pulse rounded">
        Loading...
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2">

      <span>N° Productos</span>
      <span className="text-right">
        {totalItems === 1 ? '1 artículo' : `${totalItems} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">
        {currencyFormat({ value: subTotal, country: "United States" })}
      </span>

      <span>Impuestos 15%</span>
      <span className="text-right">
        {currencyFormat({ value: tax, country: "United States" })}
      </span>

      <span className="mt-5 text-lg font-bold">Total</span>
      <span className="mt-5 text-lg font-bold text-right">
        {currencyFormat({ value: total, country: "United States" })}
      </span>

    </div>
  )
}