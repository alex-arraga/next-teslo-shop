'use client'

import clsx from "clsx"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"

type FormInputs = {
  name: string
  email: string
  password: string
}


export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSumbit: SubmitHandler<FormInputs> = async (data) => {
    const { email, name, password } = data;
    console.log({ email, name, password })

    // Server action
  }


  return (
    <form
      onSubmit={handleSubmit(onSumbit)}
      className="flex flex-col"
    >

      <label htmlFor="email">Nombre completo</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            "border-red-600 border-2": errors.name
          }
        )}
        type="text"
        placeholder='John Doe'
        autoFocus
        {...register("name", { required: true })}
      />


      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            "border-red-600 border-2": errors.email
          }
        )}
        type="email"
        placeholder='example@gmail.com'
        autoFocus
        {...register("email", { required: true })}
      />


      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            "border-red-600 border-2": errors.password
          }
        )}
        type="password"
        placeholder='******'
        autoFocus
        {...register("password", { minLength: 6, required: true })}
      />


      {/* {
        errors.name?.type === 'required' && (
          <span className="text-sm text-red-600 bg-red-50 rounded p-1 mb-4">* El nombre es requerido</span>
        )
      } */}

      <button
        type="submit"
        className="btn-primary">
        Crear cuenta
      </button>


      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}