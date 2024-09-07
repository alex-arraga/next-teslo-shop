'use client'

import { Users } from "@/interfaces"

interface Props {
  users: Users[]
}

export const UserTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">

      <thead className="bg-gray-200 border-b">
        <tr className=''>
          <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
            #ID
          </th>
          <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
            Email
          </th>
          <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
            Nombre
          </th>
          <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
            Pais
          </th>
          <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
            Telefono
          </th>
          <th scope="col" className="text-sm text-center w-fit bg-slate-100 font-semibold text-gray-900 px-6 py-4">
            Rol
          </th>
        </tr>
      </thead>

      <tbody>
        {users?.map((user) => (
          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

            <td className="text-sm text-center text-gray-900  font-semibold px-6 py-4 whitespace-nowrap">
              #{user.id.split('-').at(0)?.slice(0, -3)}
            </td>

            <td className="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
              {user.email}
            </td>

            <td className="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>

            <td className="text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
              {user.address?.country.name ?? '-'}
            </td>

            <td className="flex items-center justify-center text-sm text-center text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
              {user.address?.phone}
            </td>

            <td className="text-sm text-center text-gray-900 font-medium px-6 ">
              <select
                className="w-full p-1 bg-gray-100 rounded"
                value={user.role}
                onChange={e => console.log(e.target.value)}
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  )
}