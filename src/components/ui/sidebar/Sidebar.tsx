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
      icon: <IoPersonOutline size={30} />
    },
    {
      title: 'Ordenes',
      href: '/orders',
      icon: <IoTicketOutline size={30} />
    },
  ],
  adminOptions: [
    {
      title: 'Perfil',
      href: '/profile',
      icon: <IoPersonOutline size={30} />
    },
    {
      title: 'Ordenes',
      href: '/admin/orders',
      icon: <IoTicketOutline size={30} />
    },
    {
      title: 'Productos',
      href: '/admin/products',
      icon: <IoShirtOutline size={30} />
    },
    {
      title: 'Usuarios',
      href: '/admin/users',
      icon: <IoPeopleOutline size={30} />
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
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>

        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Menu options */}
        <div>
          {/* If is Auth and role is User */}
          {
            isAuthenticated && !isAdmin && (
              <>
                {userOptions.map((item) => (
                  <SidebarOption
                    key={item.title}
                    closeMenu={closeMenu}
                    {...item}
                  />
                ))}

                <div className="rounded h-px bg-gray-300 w-full mt-10" />

                <button
                  onClick={() => signOut()}
                  className="flex items-center mt-10 p-2 w-full hover:bg-gray-100 rounded transition-all"
                >
                  <IoLogInOutline size={30} className="rotate-180" />
                  <span className="ml-3 text-xl">
                    Cerrar sesión
                  </span>
                </button>
              </>
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
                  className="flex items-center mt-10 p-2 w-full hover:bg-gray-100 rounded transition-all"
                >
                  <IoLogInOutline size={30} className="rotate-180" />
                  <span className="ml-3 text-xl">
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
                <IoLogInOutline size={30} />
                <span className="ml-3 text-xl">
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