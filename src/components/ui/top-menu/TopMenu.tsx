'use client'

import { useEffect, useState } from "react"
import { titleFont } from "@/config/fonts"

import Link from "next/link"
import { useParams } from "next/navigation"

import { useUIStore, useCartStore } from "@/store"

import clsx from "clsx"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { Gender } from "@prisma/client"

const topMenuOptions = [
  {
    gender: "men",
    href: "/gender/men",
  },
  {
    gender: "women",
    href: "/gender/women",
  },
  {
    gender: "kids",
    href: "/gender/kids",
  },
]

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
      <div className="hidden sm:flex">
        {
          topMenuOptions.map(option => (
            <Link
              href={option.href}
              className={
                clsx("m-2 py-2 px-4 rounded-md transition-all text-center hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-gray-950",
                  {
                    "bg-blue-500 text-white dark:hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600": params.gender === option.gender
                  }
                )
              }
            >
              <p className="capitalize">
                {option.gender}
              </p>
            </Link>
          ))
        }
      </div>

      {/* Right options: Menu, cart */}
      <div className="flex items-center">
        <div className="mx-2">
          <IoSearchOutline size={20} className="w-5 h-5" />
        </div>

        <Link
          href={((totalCartProducts === 0) && loaded) ? '/empty' : '/cart'}
          className="mx-2"
        >
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
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-700">
          Menu
        </button>
      </div>
    </nav>
  )
}