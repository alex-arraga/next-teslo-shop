export const revalidate = 120 // revalidate every 2 minutes

import { Pagination, ProductGrid, Title } from "@/components";
import { notFound, redirect } from "next/navigation";
import { Gender } from '@/interfaces';
import { getPaginatedProductWithImages } from "@/actions";


interface Props {
  searchParams: {
    page?: string
  }
  params: {
    gender: Gender,
  }
}



export default async function ProductsByGenderPage({ params, searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { gender } = params;

  const { products, totalPages } = await getPaginatedProductWithImages({ page, gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  const labels: Record<Gender, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Unisex'
  }

  // todo: validate query params
  // if (id === 'kids') {
  //   notFound()
  // }

  return (
    <>
      <Title
        title={`Artículos de ${(labels)[gender]}`}
        subtitle="Todos los artículos"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}