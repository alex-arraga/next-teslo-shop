'use client'

import Link from "next/link"
import { SidebarOption } from "./SidebarOption"

import { signOut, useSession } from "next-auth/react";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline
} from "react-icons/io5";

import clsx from "clsx";
import { useUIStore } from "@/store";


const sidebarOptions = {
  userOptions: [
    {
      title: 'Perfil',
      href: '/profile',
      icon: <IoPersonOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: 'Ordenes',
      href: '/orders',
      icon: <IoTicketOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
  ],
  adminOptions: [
    {
      title: 'Perfil',
      href: '/profile',
      icon: <IoPersonOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: 'Ordenes',
      href: '/admin/orders',
      icon: <IoTicketOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: 'Productos',
      href: '/admin/products',
      icon: <IoShirtOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: 'Usuarios',
      href: '/admin/users',
      icon: <IoPeopleOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
  ],
}


export const Sidebar = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const { adminOptions, userOptions } = sidebarOptions;
  const isAdmin = session?.user.role === "admin";

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeMenu = useUIStore(state => state.closeSideMenu);


  return (
    <div>
      {/* Black background */}
      {
        isSideMenuOpen && (
          <div className="fixed top-0 w-screen h-screen z-10 bg-black opacity-40" />
        )
      }


      {/* Blur */}
      {
        isSideMenuOpen && (
          <div
            onClick={closeMenu}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        )
      }


      {/* Sidemenu */}
      <nav
        className={
          // Validate if menu is open
          clsx(
            "fixed p-5 right-0 top-0 w-full max-w-md h-screen bg-white dark:bg-neutral-800 z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>

        <IoCloseOutline
          size={40}
          className="absolute h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer top-5 right-5"
          onClick={closeMenu}
        />

        {/* Search Input */}
        {/* <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full text-sm align-middle sm:text-base bg-gray-50 max-h-10 dark:bg-neutral-700 dark:border-neutral-600 rounded py-1 px-10 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div> */}

        {/* Menu options */}
        <div className="mt-10">
          {/* If is Auth and role is User */}
          {
            isAuthenticated && !isAdmin && (
              <div className="mt-8 sm:mt-10 md:mt-16">
                {userOptions.map((item) => (
                  <SidebarOption
                    key={item.title}
                    closeMenu={closeMenu}
                    {...item}
                  />
                ))}

                {/* Separator */}
                <div className="rounded h-px bg-gray-300 dark:bg-neutral-700 w-full mt-6 sm:mt-8 xl:mt-10" />

                <button
                  onClick={() => signOut()}
                  className="flex items-center mt-6 sm:mt-8 xl:mt-10 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all"
                >
                  <IoLogInOutline size={24} className="rotate-180 h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-sm md:text-base ml-3">
                    Cerrar sesión
                  </span>
                </button>
              </div>
            )
          }

          {/* If is Auth and role is Admin */}
          {
            isAuthenticated && isAdmin && (
              <>
                {adminOptions.map((item) => (
                  <SidebarOption
                    key={item.title}
                    closeMenu={closeMenu}
                    {...item}
                  />
                ))}

                <div className="rounded h-px bg-gray-300 w-full mt-10" />

                <button
                  onClick={() => signOut()}
                  className="flex items-center mt-6 sm:mt-8 xl:mt-10 p-2 w-full hover:bg-gray-100 rounded transition-all"
                >
                  <IoLogInOutline size={24} className="rotate-180 h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-sm md:text-base ml-3">
                    Cerrar sesión
                  </span>
                </button>
              </>
            )
          }

          {/* If is not Auth */}
          {
            !isAuthenticated && (
              <Link
                href='/auth/login'
                onClick={closeMenu}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoLogInOutline size={24} />
                <span className="text-sm md:text-base ml-3">
                  Ingresar
                </span>
              </Link>
            )
          }
        </div>

      </nav>
    </div>
  )
}