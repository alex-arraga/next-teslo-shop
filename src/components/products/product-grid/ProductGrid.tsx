import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem"

interface Props {
  products: Product[]
}


export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 xl:gap-8 pb-28">
      {products.map((product) => (
        // If a product don't have images, no render item
        product.images.length === 0 ? '' :
          <ProductGridItem
            key={product.slug}
            product={product}
          />
      ))}
    </div>
  )
}