'use client'

import { useEffect, useState } from "react"
import { titleFont } from "@/config/fonts"

import Link from "next/link"
import { useParams } from "next/navigation"

import { useUIStore, useCartStore } from "@/store"

import clsx from "clsx"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { Gender } from "@prisma/client"


export const TopMenu = () => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const params = useParams<{ gender: Gender }>();

  const openSideMenu = useUIStore(state => state.openSideMenu);
  const totalCartProducts = useCartStore(state => state.getTotalItems())

  useEffect(() => {
    setLoaded(true)
  }, [])


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
            {
              (totalCartProducts > 0 && loaded) && (
                <span className="absolute text-xs font-semibold rounded-full -right-2 -top-2 px-1 fade-in bg-blue-600 text-white">
                  {totalCartProducts}
                </span>
              )
            }
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