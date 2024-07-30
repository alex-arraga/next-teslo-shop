'use client'

import Link from "next/link"
import { useParams } from "next/navigation"
import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/store"

import clsx from "clsx"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { Gender } from "@prisma/client"


export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu);
  const params = useParams<{ gender: Gender }>();


  return (
    <nav className="flex px-5 justify-between items-center w-full">

      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-extrabold`}>Teslo</span>
        </Link>
      </div>

      {/* Center menu */}
      <div className="hidden sm:block">
        <Link
          href="/gender/men"
          className={
            clsx("m-2 p-2 rounded-md transition-all hover:bg-gray-100",
              {
                "bg-blue-500 text-white hover:bg-blue-600 hover:text-white": params.gender === 'men'
              }
            )
          }
        >
          Hombres
        </Link>

        <Link
          href="/gender/women"
          className={
            clsx("m-2 p-2 rounded-md transition-all hover:bg-gray-100",
              {
                "bg-blue-500 text-white hover:bg-blue-600 hover:text-white": params.gender === 'women'
              }
            )
          }
        >
          Mujeres
        </Link>

        <Link
          href="/gender/kid"
          className={
            clsx("m-2 p-2 rounded-md transition-all hover:bg-gray-100",
              {
                "bg-blue-500 text-white hover:bg-blue-600 hover:text-white": params.gender === 'kid'
              }
            )
          }
        >
          Niños
        </Link>
      </div>

      {/* Right options: Menu, cart */}
      <div className="flex items-center">
        <Link className="mx-2" href="/search">
          <IoSearchOutline size={20} className="w-5 h-5" />
        </Link>

        <Link className="mx-2" href="/cart">
          <div className="relative">
            <span className="absolute text-xs font-semibold rounded-full -right-2 -top-2 px-1 bg-blue-600 text-white">
              3
            </span>
            <IoCartOutline size={20} className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Menu
        </button>
      </div>
    </nav>
  )
}