import { EditProductForm } from "./ui/EditProductForm"
import { Metadata, ResolvingMetadata } from "next"
import { redirect } from "next/navigation"

import { Title } from "@/components"
import { getCategories, getProductBySlug } from "@/actions"


interface Props {
  params: {
    slug: string
  }
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      // images: [], --> https://mysite.com/product/slug/image.jpg
      images: [`http://locahost:3000/products/${product?.images[1]}`], //todo: replace for 'app_url' env
    },
  }
}


export default async function AdminProductBySlugPage({ params }: Props) {
  const { slug } = params;

  const [product, allCategories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  const categories = allCategories.categories;

  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'Añadir nuevo producto' : `Editar - ${product?.title}`
  

  return (
    <section className="min-h-screen">
      <Title title={title} />

      <EditProductForm product={product ?? {}} categories={categories ?? []} />
    </section>
  );
}