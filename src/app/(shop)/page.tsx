import { ProductGrid, Title } from "@/components";
import { getPaginatedProductWithImages } from "@/actions";

interface Props {
  searchParams: {
    page?: string,
  }
}

export default async function HomePage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products } = await getPaginatedProductWithImages({ page })

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
