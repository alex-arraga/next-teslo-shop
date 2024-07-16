import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
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
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/men">
          Hombres
        </Link>

        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/women">
          Mujeres
        </Link>
        
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/kids">
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

        <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Menu
        </button>
      </div>
    </nav>
  )
}