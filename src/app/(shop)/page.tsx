import { ProductGrid, Title } from "@/components";
import { getPaginatedProductWithImages } from "@/actions";


export default async function HomePage() {
  const { products } = await getPaginatedProductWithImages()

  return (
    <div>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
      />

      <ProductGrid products={products} />
    </div>
  );
}
