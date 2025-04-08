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
      <h3 className="hidden sm:block sm:text-sm my-2 font-medium">Cantidad</h3>

      <div className="mt-4 sm:mt-0 flex items-center">
        <button
          onClick={() => onValueChange(-1)}
          className="hover:text-blue-600 dark:hover:text-blue-300 transition-all rounded-full">
          <IoRemoveCircleOutline size={20} className="dark:text-gray-200 h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <span className="text-xs sm:text-sm md:text-base bg-blue-100 dark:bg-gray-600 rounded w-10 sm:w-14 text-center mx-2">
          {quantity}
        </span>

        <button
          onClick={() => onValueChange(+1)}
          className="hover:text-blue-600 dark:hover:text-blue-300 transition-all rounded-full">
          <IoAddCircleOutline size={20} className="dark:text-gray-200 h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  )
}