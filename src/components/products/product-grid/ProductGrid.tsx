import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem"

interface Props {
  products: Product[]
}


export const ProductGrid = ({ products }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 pb-20 md:pb-28">
        {products.map((product) => (
          // If a product don't have images, no render item
          product.images.length === 0 ? '' :
            <ProductGridItem
              key={product.slug}
              product={product}
            />
        ))}
      </div>
    </section>
  )
}