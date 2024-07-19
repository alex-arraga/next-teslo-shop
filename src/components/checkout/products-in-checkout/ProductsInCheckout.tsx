import Image from "next/image"
import { Product } from "@/interfaces";

interface Props {
  product: Product
}

export const ProductsInCheckout = ({ product }: Props) => {
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

        <h2 className="font-bold text-sm md:text-lg overflow-auto max-w-sm md:mr-10 w-full">{product.title}</h2>
        <span className="text-sm md:text-base font-medium">
          ${product.price.toLocaleString()} x 3
        </span>
        <span className="text-sm md:text-base font-bold mt-2 text-blue-900">
          Subtotal: {product.price * 3}
        </span>

      </div>
    </div>
  )
}