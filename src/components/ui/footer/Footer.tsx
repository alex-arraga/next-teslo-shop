import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center text-xs mb-10">
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
  )
}