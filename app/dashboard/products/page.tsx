import React from 'react'
import { getAllProducts } from '@/prisma/products';
import Link from 'next/link';
import { Product } from "@prisma/client";
import { HiEye, HiTrash, HiPencil, HiPlus } from "react-icons/hi2";


export default async function Products() {
  const products = await getAllProducts()
  
  try {
    return (
      <div>
        <p className="text-white text-center text-3xl py-4">Products</p>
        <Link href="/dashboard/products/add" className="text-white px-2">
          <HiPlus className='text-white text-xl' />
        </Link>
        {
          products?.map((product : Product) =>
              <div key={product.number} className='flex w-[95%] mx-auto'>
                <Link href="" className="text-white text-xl px-2">
                  <HiEye className='text-white' />
                </Link>
                <div className='flex grow justify-start'>
                  <p className="text-white text-center text-xl w-10"> { product.number } </p>
                  <p className="text-white text-start text-xl grow"> { product.name } </p>
                  <p className="text-white text-center text-xl w-10"> { product.price } </p>
                </div>
                <Link href={`/dashboard/products/${product.number}`} className="text-white px-2">
                  <HiPencil className='text-white text-xl' />
                </Link>
                <Link href="" className="text-white px-2">
                  <HiTrash className='text-white text-xl' />
                </Link>
              </div>
          )
        }
      </div>
    )
  } catch (error) {
      return error
  }

  
}


//https://flowbite.com/docs/components/forms/
//https://tailwindui.com/components/application-ui/forms/form-layouts