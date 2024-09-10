'use client';

import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";
import { useForm } from "react-hook-form";

import clsx from "clsx";
import type { Product, Category, ProductImage as ProductImageInterface } from "@/interfaces";

import { createOrUpdateProduct } from "@/actions";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageInterface[] };
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
  categoryId: string,
  images?: FileList,
}

export const EditProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const { register, handleSubmit, formState: { isValid }, getValues, setValue, watch } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product?.tags?.join(' - '),
      sizes: product.sizes ?? [],

      images: undefined
    }
  });

  // If sizes data change, re-rendering
  watch('sizes')

  const onSizeChange = (size: string) => {
    // Size it's like an Array but not allow duplicate values
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)

    setValue('sizes', Array.from(sizes))
  }


  const onSumbit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append('id', product.id ?? '');
    }

    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, message } = await createOrUpdateProduct(formData)

    if (!ok) {
      alert(message)
    }

    router.replace('/admin/products')
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

        <div className="flex flex-col mb-2">
          <span>Unidades en stock</span>
          <input
            {...register('inStock', { required: true, min: 0 })}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">

            {
              sizes.map(size => (
                <div onClick={() => onSizeChange(size)} key={size} className={clsx(
                  "flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer",
                  {
                    "bg-blue-500 text-white": getValues('sizes').includes(size)
                  }
                )}>
                  <span>{size}</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input
              {...register('images', { required: true })}
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpg, image/jpeg, image/avif"
            />

          </div>

          <div className="grid grid-cols-1 p-4 mt-4 bg-slate-200 rounded-md sm:grid-cols-3 gap-3">
            {
              product.ProductImage !== undefined ?
                (product.ProductImage?.map(img => (
                  <div key={img.id}>
                    <ProductImage
                      priority
                      src={img.url}
                      alt={product.title ?? img.id.toString()}
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
                )))

                : (
                  <div className="col-span-1 sm:col-span-3">
                    <h1 className="text-center font-medium">
                      No hay imagenes
                    </h1>
                  </div>
                )
            }
          </div>

        </div>
      </div>

    </form>
  );
};