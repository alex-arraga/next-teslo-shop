import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { Category } from '@/interfaces';
import { initialData } from "@/seed/seed";


interface Props {
  params: {
    id: Category
  }
}


const seedProducts = initialData.products;


export default function ({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter(product => product.gender === id)

  const labels: Record<Category, string> = {
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
        title={`Artículos de ${(labels)[id]}`}
        subtitle="Todos los artículos"
      />

      <ProductGrid products={products} />

    </>
  );
}