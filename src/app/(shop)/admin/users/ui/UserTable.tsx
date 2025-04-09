'use client'

import { changeUserRole } from "@/actions"
import { Users } from "@/interfaces"

interface Props {
  users: Users[]
}

export const UserTable = ({ users }: Props) => {
  return (
    // TODO: Execute pop-up when the admin want change user role

    <table className="min-w-full">

      <thead className="bg-gray-200 border-b dark:border-neutral-600">
        <tr className=''>
          <th scope="col" className="table-col-style">
            #ID
          </th>
          <th scope="col" className="table-col-style">
            Email
          </th>
          <th scope="col" className="table-col-style">
            Fullname
          </th>
          <th scope="col" className="table-col-style">
            Country
          </th>
          <th scope="col" className="table-col-style">
            Phone
          </th>
          <th scope="col" className="table-col-style">
            Role
          </th>
        </tr>
      </thead>

      <tbody>
        {users?.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:border-neutral-800">

            <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6 py-4 whitespace-nowrap">
              #{user.id.split('-').at(0)?.slice(0, -3)}
            </td>

            <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6 py-4 whitespace-nowrap">
              {user.email}
            </td>

            <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>

            <td className="text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6 py-4 whitespace-nowrap">
              {user.address?.country.name ?? '-'}
            </td>

            <td className="flex items-center justify-center text-sm text-center text-gray-900 dark:text-gray-100 font-medium px-6 py-4 whitespace-nowrap">
              {user.address?.phone}
            </td>

            <td className="text-sm text-center text-gray-900 font-medium px-6 ">
              <select
                className="w-full p-1 bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-white rounded"
                value={user.role}
                onChange={e => changeUserRole(user.id, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  )
}