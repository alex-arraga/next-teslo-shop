'use client'

import { useEffect } from "react";
import { Country } from "@/interfaces";

import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";

import { useAddressStore } from '@/store';
import { setUserAddress } from "@/actions";


type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
}

interface Props {
  countries: Country[]
}

export const AdressForm = ({ countries }: Props) => {
  const setAddress = useAddressStore(state => state.setAddress);
  const address = useAddressStore(state => state.address);

  // Get user id, and if it not exist redirect to login 
  const { data: session } = useSession({
    required: true
  });

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<FormInputs>({
    defaultValues: {
      // todo: tomar de la db
    }
  });

  // Persist form data if user writed it
  useEffect(() => {
    if (address.firstName) {
      reset(address)
    }
  }, [])

  // Save address data on sumbit form
  const onSumbit: SubmitHandler<FormInputs> = async (data) => {
    setAddress(data)

    const { rememberAddress, ...restAddress } = data;

    if (rememberAddress) {
      await setUserAddress(restAddress, session!.user.id)
    } else {
      // todo: delete address
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSumbit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >

      <div className="flex flex-col mb-2">
        <label>Nombres</label>
        <input
          type="text"
          autoFocus
          className={clsx(
            "p-2 border rounded-md bg-gray-200",
            {
              "border-red-400": errors.firstName
            }
          )}
          {...register("firstName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Apellidos</label>
        <input
          type="text"
          autoFocus
          className={clsx(
            "p-2 border rounded-md bg-gray-200",
            {
              "border-red-400": errors.firstName
            }
          )}
          {...register("lastName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Dirección</label>
        <input
          type="text"
          autoFocus
          className={clsx(
            "p-2 border rounded-md bg-gray-200",
            {
              "border-red-400": errors.firstName
            }
          )}
          {...register("address", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Dirección 2 (opcional)</label>
        <input
          type="text"
          autoFocus
          className={clsx(
            "p-2 border rounded-md bg-gray-200",
            {
              "border-red-400": errors.firstName
            }
          )}
          {...register("address2")}
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Código postal</label>
        <input
          type="text"
          autoFocus
          className={clsx(
            "p-2 border rounded-md bg-gray-200",
            {
              "border-red-400": errors.firstName
            }
          )}
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>Ciudad</label>
        <input
          type="text"
          autoFocus
          className={clsx(
            "p-2 border rounded-md bg-gray-200",
            {
              "border-red-400": errors.firstName
            }
          )}
          {...register("city", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <label>País</label>
        <select
          className={clsx(
            "p-2 border rounded-md bg-gray-200 cursor-pointer",
            {
              "border-red-400": errors.country
            }
          )}
          {...register("country", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          {
            countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))
          }

        </select>
      </div>

      <div className="flex flex-col mb-2">
        <label>Teléfono</label>
        <input
          type="text"
          autoFocus
          className={clsx(
            "p-2 border rounded-md bg-gray-200",
            {
              "border-red-400": errors.firstName
            }
          )}
          {...register("phone", { required: true })}
        />
      </div>

      <div className="inline-flex items-center mt-10">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor="checkbox"
          data-ripple-dark="true"
        >
          <input
            type="checkbox"
            className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
            id="checkbox"
            {...register("rememberAddress")}
          // checked
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <span>¿Recordar Dirección?</span>
      </div>

      {/* Button checkout */}
      <button
        disabled={!isValid}
        type="submit"
        className={clsx(
          "flex mt-4 sm:mt-10 w-full justify-center text-center",
          {
            "btn-primary": isValid,
            "btn-disabled": !isValid
          })}
      >
        Siguiente
      </button>

    </form>
  )
}