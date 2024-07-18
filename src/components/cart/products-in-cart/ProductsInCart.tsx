import Image from "next/image"
import { Product } from "@/interfaces";
import { QuantitySelector } from '@/components';

import { IoTrashOutline } from "react-icons/io5";

interface Props {
  product: Product
}

export const ProductsInCart = ({ product }: Props) => {
  return (
    <div className="flex p-4 bg-gray-50 rounded-lg my-2">
      <Image
        src={`/products/${product.images[0]}`}
        alt={product.title}
        width={120}
        height={120}
        style={{
          width: '100px',
          height: '100px'
        }}
        className="rounded object-contain mr-4"
      />

      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <h2 className="font-bold text-sm md:text-lg overflow-auto max-w-sm md:mr-10 w-full">{product.title}</h2>
          <p className="text-sm md:text-base font-semibold">${product.price.toLocaleString()}</p>
        </div>

        <QuantitySelector
          quantity={3}
          className="mb-4 text-sm md:text-base"
        />

        <button className="flex items-center text-sm md:text-base gap-1 text-gray-500 hover:text-red-400 w-fit hover:font-semibold transition-all">
          <IoTrashOutline size={20} />
          Remover
        </button>
      </div>
    </div>
  )
}