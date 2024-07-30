'use client'

import { generatePaginationNumbers } from "@/utils"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import clsx from "clsx"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props {
  totalPages: number,
}

export const Pagination = ({ totalPages }: Props) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const paginationAllPages = generatePaginationNumbers(currentPage, totalPages)

  // Crear pagina en base a su numero de paginación
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`
    }

    // Retroceder pag cuando currentPage = 1
    if (Number(pageNumber) <= 0) {
      return `${pathname}`
    }

    // Siguiente pag cuando currentPage = totalPages
    if (Number(pageNumber) > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }


  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">

          <li>
            <Link
              href={createPageUrl(currentPage - 1)}
              className="relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {
            paginationAllPages.map((page, index) => (
              <li key={page + '-' + index}>
                <Link
                  href={createPageUrl(page)}
                  className={
                    clsx("relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                      {
                        "bg-blue-500 text-white hover:bg-blue-700 hover:text-white": page === currentPage
                      }
                    )
                  }
                >
                  <span>{page}</span>
                </Link>
              </li>
            ))
          }

          <li>
            <Link
              href={createPageUrl(currentPage + 1)}
              className="relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  )
}