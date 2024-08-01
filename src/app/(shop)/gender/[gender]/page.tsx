export const revalidate = 120 // revalidate every 2 minutes

import { ResolvingMetadata, Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from '@/interfaces';

import { getPaginatedProductWithImages, getProductBySlug } from "@/actions";


interface Props {
  searchParams: {
    page?: string
  }
  params: {
    gender: Gender,
  }
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const gender = params.gender

  // fetch data
  // const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: `Section ${gender.charAt(0).toUpperCase()}${gender.slice(1)}`,
    description: `Section ${gender}`,
    openGraph: {
      title: gender,
      description: `Section ${gender}`,
      // images: [`/products/${product?.images[1]}`],
    },
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