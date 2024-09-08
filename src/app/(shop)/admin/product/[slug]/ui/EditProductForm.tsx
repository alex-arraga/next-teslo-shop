'use client';

import { Product, Category, ProductImage } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  product: Product & { ProductImage?: ProductImage[] };
  categories: Category[]
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];


interface FormInputs {
  title: string,
  slug: string,
  description: string,
  price: number,
  inStock: number,
  sizes: string[],
  tags: string,
  gender: 'men' | 'women' | 'kid' | 'unisex',
  categoryId: string
}

export const EditProductForm = ({ product, categories }: Props) => {
  const [category, setCategory] = useState('');

  const { register, handleSubmit, formState: { isValid } } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(' - '),
      sizes: product.sizes,

      // TODO: Images
    }
  });


  const onSumbit = async (data: FormInputs) => {
    console.log({ data })
  }


  return (
    <form
      onSubmit={handleSubmit(onSumbit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            {...register('title', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            {...register('slug', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            {...register('description', { required: true })}
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            {...register('price', { required: true, min: 0 })}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            {...register('tags', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            {...register('gender', { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>

          <select
            {...register('categoryId', { required: true })}
            className="p-2 border rounded-md bg-gray-200 capitalize"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">[Seleccione]</option>
            {categories.map(c => (
              <option
                key={c.id}
                className="capitalize"
                value={c.id}
              >
                {c.name}
              </option>
            ))}

          </select>

        </div>

        <button className="btn-primary w-full">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">

            {
              sizes.map(size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div key={size} className="flex  items-center justify-center w-10 h-10 mr-2 border rounded-md">
                  <span>{size}</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />

          </div>

          <div className="grid grid-cols-1 bg-rose-200 p-4 mt-4 rounded-md sm:grid-cols-3 gap-3">
            {product.ProductImage?.map(img => (
              <div key={img.id}>
                <Image
                  src={`/products/${img.url}`}
                  alt={product.title}
                  width={350}
                  height={350}
                  className="rounded-t-md shadow-lg"
                />

                <button
                  type="button"
                  onClick={() => console.log(img.id, img.url)}
                  className="w-full rounded-b-md text-sm btn-delete"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>



        </div>
      </div>
    </form>
  );
};