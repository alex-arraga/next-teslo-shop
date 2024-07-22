import Link from "next/link";
import { Title } from "@/components"

import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <section className="flex justify-center items-center h-[800px]">
      <div className="bg-gray-200 p-10 rounded-md">
        <Title
          title="Tú carrito esta vacío"
        />

        <div className="flex justify-center hover:bg-blue-200 duration-300 cursor-pointer items-center gap-2 w-full bg-white rounded-md p-2 font-medium">
          <IoCartOutline size={30} />
          <Link
            href='/'
            className="text-xl"
          >
            Explorá nuestros productos
          </Link>
        </div>

      </div>
    </section>
  );
}