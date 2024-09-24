'use client'

import { useEffect, useState } from "react"
import { titleFont } from "@/config/fonts"

import { getStockBySlug } from "@/actions"

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug)
      setStock(stock)
      setLoading(false)
    };

    getStock()
  }, [slug]);




  return (
    <>
      {
        loading
          ? (
            <div className="w-full max-w-20 rounded-md bg-gray-200 animate-pulse" >
              &nbsp;
            </div >
          )

          : (
            <h1 className={`${titleFont.className} text-xl text-blue-800 font-bold`}>
              Stock: {stock}
            </h1 >
          )
      }
    </>

  )
}