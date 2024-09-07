export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { PaymentStatus, Title } from '@/components';

import { currencyFormat } from '@/utils';
import { getPaginatedOrders } from '@/actions';


export const metadata = {
  title: 'Orders',
  description: 'Orders',
};


export default async function AdminOrdersPage() {
  const { orders, ok } = await getPaginatedOrders();

  if (!ok) {
    redirect('/')
  }

  return (
    <section className='min-h-screen'>

      <Title title="Ordenes" />

      <div className="mb-10">
        <table className="min-w-full">

          <thead className="bg-gray-200 border-b">
            <tr className=''>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
                #ID
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
                Nombre completo
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
                Entrega
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
                Total
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
                Estado
              </th>
              <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
                Opciones
              </th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                <td className="text-sm text-center text-gray-900  font-semibold px-6 py-4 whitespace-nowrap">
                  #{order.id.split('-').at(0)?.slice(0, -3)}
                </td>

                <td className="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress!.firstName + ' ' + order.OrderAddress!.lastName}
                </td>

                <td className="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.address + ' - ' + order.OrderAddress?.city}
                </td>

                <td className="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {currencyFormat({
                    value: order.total,
                    country: 'United States'
                  })}
                </td>

                <td className="flex items-center text-sm text-center  text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {
                    <PaymentStatus paid={order.isPaid} />
                  }
                </td>

                <td className="text-sm text-center text-gray-900 font-medium px-6 ">
                  <Link href={`/orders/${order.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </section>
  );
}