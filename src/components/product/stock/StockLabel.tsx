'use client'

import { useEffect, useState } from "react"
import { titleFont } from "@/config/fonts"

import { getStockBySlug } from "@/actions"

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);


  useEffect(() => {
    getStock()
  }, []);


  const getStock = async () => {
    const stock = await getStockBySlug(slug)
    setStock(stock)
  };


  return (
    <h1 className={`${titleFont.className} text-xl text-blue-800 font-bold`}>
      Stock: {stock}
    </h1>
  )
}