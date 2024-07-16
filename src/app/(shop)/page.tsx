import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products

export default function HomePage() {
  return (
    <div>
      <Title
        title="Hombres"
        subtitle="Todos los productos"
      />

      <ProductGrid products={products} />
    </div>
  );
}
