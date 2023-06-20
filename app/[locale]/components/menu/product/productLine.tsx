import React from 'react';
import Link from 'next/link';

import { HiOutlineStar, HiStar } from "react-icons/hi";
import { HiDotsHorizontal } from "react-icons/hi";
import { GiFullPizza,GiBowlOfRice } from "react-icons/gi";
import { BiCheese } from "react-icons/bi";

import { Product } from '@prisma/client';

function productTypeIcon(type: string, isIngredient:boolean) {
  if (type.toUpperCase() === "PIZZA") {
    return <GiFullPizza className='text-sm text-gray-300 ml-1' />;
  } else if (type.toUpperCase() === "MASSA" || type.toUpperCase() === "CARNE" || type.toUpperCase() === "SALADA") {
    return <GiBowlOfRice className='text-sm text-gray-300 ml-1' />;
  } else if (isIngredient) {
    return <BiCheese className='text-sm text-gray-300 ml-1' />;
  } else {
    return <HiDotsHorizontal className='text-sm text-gray-300 ml-1' />;
  }
}

export default function ProductLine({ product }: { product: Product }) {
  const isIngredient = product.ingredients ? false : true
  const ingredientList = !isIngredient ? product.ingredients.map((ingredient) => ingredient.name).join(', ') : "";

  return (
    <Link href={`/menu/${product.id}`} className='border rounded-xl p-2 shadow-md bg-slate-800/40 border-transparent'>
      <div className="flex justify-start">
        <p className="text-lg font-bold mr-2">{product.number}</p>
        <div className="flex flex-grow items-center">
            <p className="text-lg font-bold mr-2">{product.name}</p>
            {product.recommended ? <HiStar className="text-sm text-gray-300"/> : ""}
            {productTypeIcon(product.type, isIngredient)}
        </div>
        <p className="text-lg font-bold">{product.price}<span className='ml-1'>€</span></p>
      </div>
      <div className="mt-1">
        <p className="text-gray-400 text-xs overflow-hidden whitespace-normal">{ingredientList}</p>
      </div>
    </Link>
  );
}
