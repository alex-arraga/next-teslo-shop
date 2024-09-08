export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { UserTable } from './ui/UserTable';
import { redirect } from 'next/navigation';
import { Pagination, Title } from '@/components';

import { getPaginatedUsers } from '@/actions';


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

      <Pagination totalPages={1} />
    </section>
  );
}