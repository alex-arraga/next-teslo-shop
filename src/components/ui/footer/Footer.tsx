import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-gray-300 h-16 sm:h-24 flex justify-end items-end">
      <div className="flex justify-center items-center w-full h-full text-xs">
        <Link
          href='/'
          className="mr-3"
        >
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
          <span >| shop</span>
          <span >© {new Date().getFullYear()} </span>
        </Link>

        <Link
          href='/'
          className="mr-3"
        >
          Privacidad & Legal
        </Link>

        <Link
          href='/'
          className="mr-3"
        >
          Ubicaciones
        </Link>
      </div>
    </footer>
  )
}