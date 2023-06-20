"use client"

import Link from "next-intl/link"
import { useState } from "react"
import { HiHome,HiOutlineBars3,HiXMark  } from "react-icons/hi2";

export default function Nav({ messages,locale }){
    const [ showMenu, setShowMenu ] = useState<boolean>(false);

    function handleMenu() {
        const menuToggle = !showMenu;
        setShowMenu(menuToggle);
    }

    return (
        <div className="w-full">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/" className="text-white text-3xl font-semibold">Lugano</Link>
                </div>
                <div className="hidden md:block">
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="text-gray-300 hover:text-white text-xl">{messages.Home}</Link></li>
                        <li><Link href="/menu" className="text-gray-300 hover:text-white text-xl">{messages.Menu}</Link></li>
                        <li><Link href="/about" className="text-gray-300 hover:text-white text-xl">{messages.About}</Link></li>
                        <li><Link href="/contact" className="text-gray-300 hover:text-white text-xl">{messages.Contact}</Link></li>
                        {
                            locale === "pt" ?
                                <li className="rounded border px-1 border-white"><Link href="/" locale="en" className="text-gray-300 hover:text-white text-xl">En</Link></li> :
                                <li className="rounded border px-1 border-white"><Link href="/" locale="pt" className="text-gray-300 hover:text-white text-xl">Pt</Link></li>
                        }
                    </ul>
                </div>
                <div className="md:hidden">
                    <button className="text-gray-300 hover:text-white focus:outline-none" onClick={() => handleMenu()}>
                        <HiOutlineBars3 className="text-3xl transform transition duration-300 ease-in-out" />
                    </button>
                    <div className={`md:hidden w-full h-full ${ showMenu ? "flex fixed inset-0 bg-gray-900 justify-center items-center" : "hidden" }`}>
                    <div className="absolute top-0 right-0 p-4">
                        <button
                            className="text-gray-300 hover:text-white focus:outline-none"
                            onClick={() => handleMenu()}
                            >
                            <HiXMark className="text-3xl" />
                            </button>
                        </div>
                        <ul className="flex flex-col space-y-4">
                            <li><Link href="/" className="text-gray-300 hover:text-white text-xl">{messages.Home}</Link></li>
                            <li><Link href="/menu" className="text-gray-300 hover:text-white text-xl">{messages.Menu}</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white text-xl">{messages.About}</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-white text-xl">{messages.Contact}</Link></li>
                            {
                            locale === "pt" ?
                                <li className="rounded border px-1 border-white text-center"><Link href="/" locale="en" className="text-gray-300 hover:text-white text-xl">En</Link></li> :
                                <li className="rounded border px-1 border-white text-center"><Link href="/" locale="pt" className="text-gray-300 hover:text-white text-xl">Pt</Link></li>
                            }
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
