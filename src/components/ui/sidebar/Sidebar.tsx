'use client'


import { SidebarOption } from "./SidebarOption"
import { IoCloseOutline, IoLogInOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"


const sidebarOptions = {
  userOptions: [
    {
      title: 'Perfil',
      href: '/',
      icon: <IoPersonOutline size={30} />
    },
    {
      title: 'Ordenes',
      href: '/',
      icon: <IoTicketOutline size={30} />
    },

    {
      title: 'Productos',
      href: '/',
      icon: <IoShirtOutline size={30} />
    },
    {
      title: 'Usuarios',
      href: '/',
      icon: <IoPeopleOutline size={30} />
    },
  ],

  authOptions: [
    {
      title: 'Ingresar',
      href: '/',
      icon: <IoLogInOutline size={30} />
    },
    {
      title: 'Salir',
      href: '/',
      icon: <IoLogInOutline size={30} />
    },
  ],
}


export const Sidebar = () => {
  return (
    <div>

      {/* Black background */}
      <div className="fixed top-0 w-screen h-screen z-10 bg-black opacity-40" />


      {/* Blur */}
      <div className="fade-in fixed z-10 top-0 left-0 w-screen h-screen backdrop-filter backdrop-blur-sm" />


      {/* Sidemenu */}
      <nav
        // todo: efecto de slide
        className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">

        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => console.log('click')}
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
          {
            sidebarOptions.userOptions.map((item) => (
              <SidebarOption key={item.title} {...item} />
            ))
          }

          <div className="rounded h-px bg-gray-300 w-full mt-10" />

          {
            sidebarOptions.authOptions.map((item) => (
              <SidebarOption key={item.title} {...item} />
            ))
          }
        </div>

      </nav>
    </div>
  )
}