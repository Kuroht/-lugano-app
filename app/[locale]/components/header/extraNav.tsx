
import { HiHome,HiOutlineClock,HiOutlinePhone,HiXMark } from "react-icons/hi2";

export default function Nav(){
    return (
        <div className="hidden md:w-full md:flex">
            <div className="border-b-2 border-black flex justify-between">
                <div className="border-b-2 border-black flex">
                    <div className="flex mr-4"><HiHome className="text-white h-7 w-7 mr-2" /> <p className="text-white text-xs">EDF Mestre de Avis, Av. Nuno Álvares loja 6, 5400-419 Chaves</p> </div>
                    <div className="flex"><HiOutlineClock className="text-white h-7 w-7 mr-2" /> <p className="text-white text-xs">Ter/Dom: 9:00/23:00 </p></div>
                </div>
                <div className="border-b-2 border-black flex">
                    <div className="flex mr-4"><HiOutlinePhone className="text-white h-5 w-5 mr-2" /> <p className="text-white text-xs">276325294</p> </div>
                </div>
            </div>
        </div>
    )
}


/*
"use client"

import Image from "next/image"
import { HiHome,HiOutlineClock,HiOutlinePhone,HiXMark } from "react-icons/hi2";
import { RiTakeawayFill } from "react-icons/ri";
import glovo from "../../../public/icon/glovo-min.png"
import roombo from "../../../public/icon/roombo-min.png"

import { useState } from "react"

export default function Nav(){
    const [showTakeAway, setShowTakeAway] = useState(false);

    function handleMenu() {
        const menuToggle = !showTakeAway;
        setShowTakeAway(menuToggle);
    }

    return (
        <div className="hidden md:w-full md:flex">
            <div className="border-b-2 border-black flex justify-between">
                <div className="border-b-2 border-black flex">
                    <div className="flex mr-4"><HiHome className="text-white h-7 w-7 mr-2" /> <p className="text-white text-xs">EDF Mestre de Avis, Av. Nuno Álvares loja 6, 5400-419 Chaves</p> </div>
                    <div className="flex"><HiOutlineClock className="text-white h-7 w-7 mr-2" /> <p className="text-white text-xs">Ter/Dom: 9:00/23:00 </p></div>
                </div>
                <div className="border-b-2 border-black flex">
                    <div className="flex mr-4"><HiOutlinePhone className="text-white h-5 w-5 mr-2" /> <p className="text-white text-xs">276325294</p> </div>
                    <div className="flex mr-2">
                        <button type="button" onClick={() => handleMenu()}>
                            {
                                showTakeAway ? <HiXMark className="text-white h-7 w-7 mr-2" />
                                : <RiTakeawayFill className="text-white h-5 w-5 mr-2"/>
                            }
                        </button>
                        <div className={`space-y-2 w-5 h-fit ${showTakeAway ? "flex flex-col" : "hidden"}`}>
                            <p className="text-white text-lg">Uber</p>
                            <p className="text-white text-lg">Glovo</p>
                            <p className="text-white text-lg">Roombo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


*/