'use client'

import Link from "next/link"
import { SidebarOption } from "./SidebarOption"

import { signOut, useSession } from "next-auth/react";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoPeopleOutline,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline
} from "react-icons/io5";

import clsx from "clsx";
import { useUIStore } from "@/store";


const sidebarOptions = {
  userOptions: [
    {
      title: 'Profile',
      href: '/profile',
      icon: <IoPersonOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: 'Orders',
      href: '/orders',
      icon: <IoTicketOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
  ],
  adminOptions: [
    {
      title: 'Profile',
      href: '/profile',
      icon: <IoPersonOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: <IoTicketOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: <IoShirtOutline size={24} className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: 'Users',
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

        {/* Menu options */}
        <div className="mt-10 md:mt-20">
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
                    Log out
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

                {/* Separator */}
                <div className="rounded h-px bg-gray-300 dark:bg-neutral-700 w-full mt-6 sm:mt-8 xl:mt-10" />

                <button
                  onClick={() => signOut()}
                  className="flex items-center mt-6 sm:mt-8 xl:mt-10 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all"
                >
                  <IoLogInOutline size={24} className="rotate-180 h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-sm md:text-base ml-3">
                    Log out
                  </span>
                </button>
              </>
            )
          }

          {/* If is not Auth */}
          {
            !isAuthenticated && (
              <div>
                <Link
                  href='/auth/login'
                  onClick={closeMenu}
                  className="flex items-center mt-14 p-2 bg-gray-300 dark:bg-neutral-700 hover:bg-gray-100 dark:hover:bg-gray-700 w-full rounded transition-all"
                >
                  <IoLogInOutline size={24} />
                  <span className="text-sm md:text-base ml-3">
                    Sign in
                  </span>
                </Link>

                <Link
                  href='/auth/new-account'
                  onClick={closeMenu}
                  className="flex items-center mt-4 p-2 bg-gray-300 dark:bg-neutral-700 hover:bg-gray-100 dark:hover:bg-gray-700 w-full rounded transition-all"
                >
                  <IoPersonCircleOutline size={24} />
                  <span className="text-sm md:text-base ml-3">
                    Sign up
                  </span>
                </Link>
              </div>
            )
          }
        </div>

      </nav>
    </div>
  )
}