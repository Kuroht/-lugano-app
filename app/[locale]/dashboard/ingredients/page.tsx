
import React from 'react'
import Link from 'next/link';
import { HiPlus } from "react-icons/hi2";
import { Ingredients } from '@prisma/client';
import { getIngredients } from '@/prisma/ingredients';
import ListOptions from '../../components/forms/list';


export default async function Ingredients() {
  try {
    const ingredients : Ingredients[] = await getIngredients();


    return (
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard/ingredients/add" 
          className='flex border-2 shadow-lg rounded-md bg-slate-500 w-fit items-center py-1 px-2'>
            <HiPlus className="text-white cursor-pointer mr-2" />
              <span className="text-white">Create</span>
        </Link>
        {/* Desktop/Table View */}
        <div className="hidden md:block">
          <div className="flex flex-col mb-4">
            <div className="flex flex-row py-2 px-4 font-bold text-center">
              <div className="w-1/12">Number</div>
              <div className="w-4/12">Name</div>
              <div className="w-3/12">Type</div>
              <div className="w-4/12">Price</div>
              <div className="w-2/12">Options</div>
            </div>
          </div>
          {
              ingredients ? ingredients!.map((ingredient) => (
              <div key={ingredient.id} className="flex flex-col mb-2 text-center">
                <div className="flex flex-row py-2 px-4">
                  <div className="w-1/12">{ingredient.number}</div>
                  <div className="w-4/12">{ingredient.name}</div>
                  <div className="w-3/12">{ingredient.type}</div>
                  <div className="w-4/12">{ingredient.price}</div>
                  <div className="w-2/12">
                    <ListOptions item={{type:"ingredients", value:ingredient}}/>
                  </div>
                </div>
              </div>
            )) : <p className='w-full text-center text-white text-2xl'>Loading...</p>
          }
        </div>
  
        {/* Mobile/List View */}
        <div className="block md:hidden">
          {
            ingredients ? ingredients!.map((ingredient) => (
              <div key={ingredient.id} className="flex flex-col mb-2 py-2 px-4">
                <div className="flex flex-row">
                  <div className="w-3/12 font-bold">Number:</div>
                  <div className="w-9/12">{ingredient.number}</div>
                </div>
                <div className="flex flex-row">
                  <div className="w-3/12 font-bold">Name:</div>
                  <div className="w-9/12">{ingredient.name}</div>
                </div>
                <div className="flex flex-row">
                  <div className="w-3/12 font-bold">Options:</div>
                  <div className="w-9/12">
                    <ListOptions item={{type:"ingredients", value:ingredient}}/>
                  </div>
                </div>
              </div>
            )) : <p className='w-full text-center text-white text-2xl'>Loading...</p>
          }
        </div>
      </div>
    )


  } catch(e) {
    console.log(e)
  }
}
