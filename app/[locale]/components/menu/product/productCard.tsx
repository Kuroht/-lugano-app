import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
import { GiFullPizza,GiBowlOfRice } from "react-icons/gi";
import { BiCheese } from "react-icons/bi";

import hero from "../../../../../public/pizza.png"


function productTypeIcon(type : string, isIngredient:boolean){
    if (type.toLocaleUpperCase() === "PIZZA") {
        return <GiFullPizza className='text-2xl' />
    } else if (type.toLocaleUpperCase() === "MASSA" || type.toLocaleUpperCase() === "CARNE" || type.toLocaleUpperCase() === "SALADA") {
        return <GiBowlOfRice className='text-2xl' />
    } else if (isIngredient){
        return <BiCheese className='text-2xl' />
    } else {
        return <HiDotsHorizontal className='text-2xl' />
    }
}

export default function ProductCard( { product } ) {
  const isIngredient = product.ingredients ? true : false
  return (
    <Link href={`/menu/${product.id}`} className='flex flex-col border rounded-xl p-4 shadow-md bg-slate-900/90 border-transparent'>
        <div className="flex flex-row justify-between">
            { product.recommended ? <HiStar className="text-2xl"/> : <HiOutlineStar className="text-2xl"/> }
            { productTypeIcon(product.type, isIngredient) }
        </div>
        <div className="flex justify-center items-center h-48 sm:h-auto">
            <Image src={product.photo || hero} 
            alt={product.name} 
            className="object-cover w-56 h-56 overflow-x-visible" 
            priority={false}
            width={150}
            height={150}
            quality={10}/>
        </div>
        <div className="mt-4 flex flex-row justify-between">
            <h3 className="text-xl font-bold"><span className='mr-1'>{product.number}</span>{product.name}</h3>
            <p className="text-xl font-bold">{product.price}<span className='ml-1'>€</span></p>
        </div>
        <p className="mt-4 text-gray-400 overflow-hidden whitespace-normal">{product.description}</p>
    </Link>
  )
}
