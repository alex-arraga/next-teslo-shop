import { titleFont } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"

export const PageNotFound = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full justify-center items-center align-middle">

      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-8xl sm:text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos, la pagina no existe</p>

        {/* Link to go home */}
        <Link
          href='/'
          className="font-normal hover:font-medium"
        >
          <p className="mt-4 bg-white hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer p-4 rounded-md">
            <span>Regresar al inicio</span>
          </p>
        </Link>
      </div>

      {/* Astronaut image */}
      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className="p-5 sm:p-0"
          width={500}
          height={500}
        />
      </div>

    </div>
  )
}