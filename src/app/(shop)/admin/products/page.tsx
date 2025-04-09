export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link';
import { Pagination, ProductImage, Title } from '@/components';

import { currencyFormat, labels } from '@/utils';
import { getPaginatedProductWithImages } from '@/actions';


export const metadata = {
  title: 'Products',
  description: 'Products',
};


interface Props {
  searchParams: {
    page?: string,
  }
}


export default async function AdminProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductWithImages({ page })


  return (
    <section className='min-h-screen'>

      <Title title="Mantenimiento de Productos" />

      <div className='flex justify-start mb-5'>
        <Link
          className='btn-primary'
          href='/admin/product/new'
        >
          Crear nuevo producto
        </Link>
      </div>



      <div className="mb-10">
        <table className="min-w-full">

          <thead className="bg-gray-200 border-b dark:border-neutral-600">
            <tr>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 dark:bg-neutral-900 dark:text-gray-200 font-semibold text-gray-900 px-6 py-4">
                Image
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 dark:bg-neutral-900 dark:text-gray-200 font-semibold text-gray-900 px-6 py-4">
                Title
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 dark:bg-neutral-900 dark:text-gray-200 font-semibold text-gray-900 px-6 py-4">
                Stock
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 dark:bg-neutral-900 dark:text-gray-200 font-semibold text-gray-900 px-6 py-4">
                Price
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 dark:bg-neutral-900 dark:text-gray-200 font-semibold text-gray-900 px-6 py-4">
                Size
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 dark:bg-neutral-900 dark:text-gray-200 font-semibold text-gray-900 px-6 py-4">
                Gender
              </th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-neutral-800">

                <td className="flex justify-center text-sm text-center text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/product/${product.slug}`}
                    className='cursor-pointer hover:scale-110 hover:shadow-md hover:shadow-gray-300 rounded-md transition-all'
                  >
                    <ProductImage
                      className='rounded-md object-cover'
                      src={product.images[0]}
                      alt={product.title}
                      width={80}
                      height={80}
                    />
                  </Link>
                </td>

                <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className='font-semibold hover:text-blue-600 hover:font-bold transition-all'
                  >
                    {product.title}
                  </Link>
                </td>

                <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>

                <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-bold px-6 py-4 whitespace-nowrap">
                  {currencyFormat({
                    value: product.price,
                    country: 'United States'
                  })}
                </td>

                <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6">
                  <div className='flex justify-center'>
                    {product.sizes.join(' - ')}
                  </div>
                </td>

                <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6">
                  {product.gender}
                </td>

              </tr>
            ))}
          </tbody>

        </table>


        <Pagination totalPages={totalPages} />

      </div>

    </section>
  );
}