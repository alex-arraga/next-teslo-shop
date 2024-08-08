'use client'

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom";

import { IoInformationCircleOutline } from "react-icons/io5";
import { authenticate } from "@/actions";
import clsx from "clsx";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);


  return (
    <form action={dispatch} className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
        placeholder='example@gmail.com'
      />


      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
        placeholder='******'
      />

      {
        state === 'CredentialSignin' && (
          <div className="flex items-center gap-1 bg-red-100 w-full h-full mb-4 p-1 rounded">
            <IoInformationCircleOutline
              size={20}
              className="text-red-800"
            />
            <p className="text-red-800 text-sm">Error en email o contraseña</p>
          </div>
        )
      }


      <LoginButton />


      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center"
      >
        Crear una nueva cuenta
      </Link>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={pending}
    >
      {pending ? (
        <div className="flex justify-center items-center gap-2">
          <p>Cargando</p>
          <div className="loader" />
        </div>
      ) : (
        <p>Ingresar</p>
      )}
    </button>
  )
}