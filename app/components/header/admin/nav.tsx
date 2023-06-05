"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { HiOutlinePlus,HiEyeSlash,HiListBullet,HiXMark  } from "react-icons/hi2";

export default function Nav(){
    const [ showMenu, setShowMenu ] = useState<boolean>(true);

    const menuItemsDetails = [
        { icon:HiOutlinePlus, text:"Add" },
        { icon:HiListBullet, text:"List" },
        { icon:HiEyeSlash, text:"Hidden" }
    ]
    const menuItems = [
        { name: "Products", link: "/products" },
        { name: "Ingredients", link: "/ingredients" },
        { name: "Users", link: "/users" }
    ]

    function handleMenu() {
        const menuToggle = !showMenu;
        setShowMenu(menuToggle);
    }

    return (
        <div className="text-white flex items-center justify-between p-4 w-full h-fit bg-slate-950 bg-opacity-40">
            <div className="flex items-center space-x-4 mx-auto">
                <div className="flex items-center space-x-8">
                    {
                        menuItems.map((item) => (
                            <div key={item.name} className="flex flex-col items-center space-x-2">
                                <p className="text-xl mb-2">{item.name}</p>
                                <div className={`flex ${ showMenu ? "flex-row space-x-2" : "flex-col space-y-2"}`}>
                                   {
                                        menuItemsDetails.map(({ icon: Icon, text }) => (
                                            showMenu ? <Icon key={text} className="h-4 w-4" /> :
                                                <div key={text} className="flex flex-row space-x-2">
                                                    <Icon className="h-4 w-4" />
                                                    <span className="text-sm">{text}</span>
                                                </div>
                                        ))
                                    } 
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
                <button
                    className="text-white focus:outline-none"
                    onClick={() => handleMenu()}
                    >
                    {showMenu ? (
                        <HiOutlinePlus className="h-6 w-6" />
                    ) : (
                        <HiXMark className="h-6 w-6" />
                    )}
                </button>
            </div>
        </div>
    );
};

