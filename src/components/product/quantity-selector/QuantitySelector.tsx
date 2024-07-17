'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity)

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value)
  }


  return (
    <div className="mb-8">
      <h3 className="mb-2 font-medium">Cantidad</h3>

      <div className="flex items-center">
        <button
          onClick={() => onQuantityChange(-1)}
          className="hover:text-blue-600 transition-all rounded-full">
          <IoRemoveCircleOutline size={25} />
        </button>

        <span className="bg-blue-100 rounded w-20 text-center mx-2">{count}</span>

        <button
          onClick={() => onQuantityChange(+1)}
          className="hover:text-blue-600 transition-all rounded-full">
          <IoAddCircleOutline size={25} />
        </button>
      </div>
    </div>
  )
}