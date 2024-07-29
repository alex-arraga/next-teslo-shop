import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductWithImages } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string,
  }
}

export default async function HomePage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductWithImages({ page })
  
  if (products.length === 0) {
    redirect('/')
  }


  return (
    <div>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}
