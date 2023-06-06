"use client"

import { HiStar, HiTrash, HiPencil } from "react-icons/hi2";
import { Product } from '@prisma/client';
import Link from 'next/link';

export default function ListOptions(props : any){
    function remove(item: any){
        console.log("removed product", item.name);
    }
    function recommend(product: Product){
        console.log("recommended product", product.name);
    }

    return (
        <div className="flex md:justify-around">
            <button type='button' onClick={ ()=>remove(props.item.value) }><HiTrash className="text-gray-500 cursor-pointer" /></button>
            <button type='button' onClick={ ()=>recommend(props.item.value) }><HiStar className="text-red-500 cursor-pointer" /></button>
            <Link href={`/dashboard/${props.item.type}/${props.item.value.id}`}><HiPencil className="text-blue-500 cursor-pointer" /></Link>     
        </div>
    )
}
