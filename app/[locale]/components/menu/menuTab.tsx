
  
"use client"
import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { GiFullPizza,GiBowlOfRice } from "react-icons/gi";
import { BiCheese } from "react-icons/bi";
import MenuPage from "./menuPage";
import { Product } from "@prisma/client";


export default function MenuTab({products, ingredients, message}) {
  const [currentPage, setCurrentPage] = useState<string>("pizza");
  const [productsArr, setProductsArr] = useState(products);

  useEffect(() => {
    productsByType(currentPage);
  }, [currentPage]);;

  const getMenuPage = () => {
    switch (currentPage) {
      case "pizza":
        return <MenuPage title={message.pizza} icon={<GiFullPizza className="text-6xl" />} contents={productsArr} message={message}/>;
      case "pasta":
        return <MenuPage title={message.pasta} icon={<GiBowlOfRice className="text-6xl" />} contents={productsArr} message={message}/>;
      case "ingredient":
        return <MenuPage title={message.ingredient} icon={<BiCheese className="text-6xl" />} contents={ingredients} message={message}/>;
      case "other":
        return <MenuPage title={message.other} icon={<HiDotsHorizontal className="text-6xl" />} contents={productsArr} message={message}/>;
      default:
        return <div>Page not found</div>;
    }
  };

  function productsByType(type: string) {
    let filteredProducts: Product[] = [];
  
    switch (type.toLocaleUpperCase()) {
      case "PIZZA":
        filteredProducts = products.filter((product) => product.type.toLocaleUpperCase() === "PIZZA");
        break;
      case "PASTA":
        filteredProducts = products.filter((product) => ["MASSA", "CARNE", "SALADA"].includes(product.type.toLocaleUpperCase()));
        break;
      case "OTHER":
        filteredProducts = products.filter((product) => product.type.toLocaleUpperCase() === "EXTRAS");
        break;
      default:
        // Reset the productsArr state to the original products array
        setProductsArr(products);
        break;
    }
    setProductsArr(filteredProducts);
    setCurrentPage(type);
  }
  
  

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <div className="flex items-center justify-center py-4">
        <div className="flex space-x-4">
          <button
            className={`menu-btn ${currentPage === "pizza" && "active border-b-2 border-white pb-2"}`}
            onClick={() => productsByType("pizza")}
          >
            <GiFullPizza className={`h-14 w-14 sm:h-20 sm:w-20 ${currentPage === "pizza" ? "animate-bounce-y" : ""}`} />
          </button>
          <button
            className={`menu-btn ${currentPage === "pasta" && "active border-b-2 border-white pb-2"}`}
            onClick={() => productsByType("pasta")}
          >
            <GiBowlOfRice className={`h-14 w-14 sm:h-20 sm:w-20 ${currentPage === "pasta" ? "animate-bounce-y" : ""}`} />
          </button>
          <button
            className={`menu-btn ${currentPage === "ingredient" && "active border-b-2 border-white pb-2"}`}
            onClick={() => productsByType("ingredient")}
          >
            <BiCheese className={`h-14 w-14 sm:h-20 sm:w-20 ${currentPage === "ingredient" ? "animate-bounce-y" : ""}`} />
          </button>
          <button
            className={`menu-btn ${currentPage === "other" && "active border-b-2 border-white pb-2"}`}
            onClick={() => productsByType("other")}
          >
            <HiDotsHorizontal className={`h-14 w-14 sm:h-20 sm:w-20 ${currentPage === "other" ? "animate-bounce-y" : ""}`} />
          </button>
        </div>
      </div>
      {/* Render the content based on the selected page */}
      { getMenuPage() }
    </div>
  );
};
