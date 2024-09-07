export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { PaymentStatus, Title } from '@/components';

import { currencyFormat } from '@/utils';
import { getPaginatedUsers } from '@/actions';
import { UserTable } from './ui/UserTable';


export const metadata = {
  title: 'Users',
  description: 'Admin users',
};


export default async function AdminUsersPage() {
  const { users, ok } = await getPaginatedUsers();

  if (!ok) {
    redirect('/')
  }

  return (
    <section className='min-h-screen'>

      <Title title="All users" />

      <div className="mb-10">
        <UserTable users={users ?? []} />
      </div>

    </section>
  );
}