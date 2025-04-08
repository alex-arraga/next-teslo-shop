'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
  className?: string,
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelectorProduct = ({ quantity, className, onQuantityChanged }: Props) => {

  const onValueChange = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value)
  }

  return (
    <div className={className}>
      <h3 className="text-sm my-2 font-medium">Cantidad</h3>

      <div className="mt-4 sm:mt-0 flex items-center">
        <button
          onClick={() => onValueChange(-1)}
          className="hover:text-blue-600 dark:hover:text-blue-300 transition-all rounded-full">
          <IoRemoveCircleOutline size={32} className="dark:text-gray-200 h-6 w-6" />
        </button>

        <span className="flex items-center justify-center text-sm md:text-base bg-blue-100 dark:bg-gray-600 rounded align-middle text-center h-7 w-16 sm:w-20 mx-2">
          {quantity}
        </span>

        <button
          onClick={() => onValueChange(+1)}
          className="hover:text-blue-600 dark:hover:text-blue-300 transition-all rounded-full">
          <IoAddCircleOutline size={32} className="dark:text-gray-200 h-6 w-6" />
        </button>
      </div>
    </div>
  )
}