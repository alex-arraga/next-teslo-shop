'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
  className?: string,
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, className, onQuantityChanged }: Props) => {

  const onValueChange = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value)
  }


  return (
    <div className={className}>
      <h3 className="mb-2 font-medium">Cantidad</h3>

      <div className="flex items-center">
        <button
          onClick={() => onValueChange(-1)}
          className="hover:text-blue-600 transition-all rounded-full">
          <IoRemoveCircleOutline size={25} />
        </button>

        <span className="bg-blue-100 rounded w-20 text-center mx-2">{quantity}</span>

        <button
          onClick={() => onValueChange(+1)}
          className="hover:text-blue-600 transition-all rounded-full">
          <IoAddCircleOutline size={25} />
        </button>
      </div>
    </div>
  )
}