"use client"

import { HiStar, HiTrash, HiPencil } from "react-icons/hi2";
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function ListOptions(props : any){
    const router = useRouter();
    async function remove(type: string,item: any){
        const result = window.confirm("Are u sure u want to delete this?");

        if(result){
            try {
                await fetch("/api/"+type+"/"+item.id,{
                    method: "DELETE",
                });
                
                router.refresh();
            } catch (error) {
                console.log(error);
            }
        }
    }
    async function recommend(item: any){
        const result = window.confirm("Are u sure u want to  this?");

        if(result){
            await fetch("/api/products/"+item.id,{
                method: "PATCH",
                body: JSON.stringify(item.recommended ? false : true),
            });
        }
    }

    return (
        <div className="flex md:justify-around">
            <button type='button' onClick={ ()=>remove(props.item.type, props.item.value) }><HiTrash className="text-gray-500 cursor-pointer" /></button>
            <button type='button' onClick={ ()=>recommend(props.item.value) }><HiStar className="text-red-500 cursor-pointer" /></button>
            <Link href={`/dashboard/${props.item.type}/${props.item.value.id}`}><HiPencil className="text-blue-500 cursor-pointer" /></Link>     
        </div>
    )
}
