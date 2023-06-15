"use client"
import React, { useEffect, useState } from 'react';
import { FaGreaterThanEqual, FaLessThanEqual, FaThLarge,FaThList } from 'react-icons/fa';
import ProductCard from './productCard';
import ProductLine from './productLine';
import { Product } from '@prisma/client';

type Filters = {
  byName: string;
  byNumberValue: number;
  byNumberBig: boolean;
  byPriceValue: number;
  byPriceBig: boolean;
  byIngredient: string;
  byIngrType: string;
};

export default function Filters({ filteredContent }) {
  const [contentsArr, setContentsArr] = useState(filteredContent);
  const [productShowCard, setProductShowCard] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    byName: '',
    byNumberValue: 0,
    byNumberBig: true,
    byPriceValue: 0,
    byPriceBig: true,
    byIngredient: '',
    byIngrType: '',
  });

  const isIngredient = filteredContent.find((product) => product.ingredients ? false : true)
  
  useEffect(() => {
    handleFilterContentArr();
  }, [filters, filteredContent]);

  function handleFilterContentArr() {
    const filteredArr = filteredContent?.filter((product) => {
      // Filter by name
      if (
        filters.byName !== '' &&
        !product.name.toLowerCase().includes(filters.byName.toLowerCase())
      ) {
        return false;
      }

      // Filter by number
      if (filters.byNumberValue !== 0 && product.number !== filters.byNumberValue) {
        return false;
      }

      // Filter by price
      if (filters.byPriceValue !== 0) {
        if (filters.byPriceBig && product.price > filters.byPriceValue) {
          return false;
        } else if (!filters.byPriceBig && product.price < filters.byPriceValue) {
          return false;
        }
      }

      // Filter by ingredient
      if (
        filters.byIngredient !== '' &&
        !product.ingredients.includes(filters.byIngredient)
      ) {
        return false;
      }

      // Filter by ingredient type
      if (
        filters.byIngrType !== '0' &&
        !product.type.toLowerCase().includes(filters.byIngrType.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setContentsArr(filteredArr);
  }

  return (
    <div className="flex flex-col justify-center p-4 w-full">
      <form className="flex flex-row mx-auto items-center mb-2">
        <div className="mr-1">
          <button
            type='button'
            className="menu-btn flex items-center"
            onClick={() => setProductShowCard(!productShowCard)}
          >
            {productShowCard ? (
                <FaThLarge className="h-6 w-6" />
                ) : (
                <FaThList className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="mr-1">
          <input
            type="text"
            minLength={2}
            maxLength={20}
            placeholder="By name"
            className="text-white bg-transparent block w-full shadow-none sm:text-sm border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
            value={filters.byName}
            onChange={(e) =>
              setFilters({
                ...filters,
                byName: e.target.value,
              })
            }
          />
        </div>
        <div className="mr-1">
          <select
            className={`text-white bg-transparent w-full shadow-none sm:text-sm border-b-2 border-gray-300 focus:outline-none focus:border-blue-500  appearance-none ${!isIngredient ? "hidden" : ""}`}
            value={filters.byIngrType}
            onChange={(e) =>
              setFilters({
                ...filters,
                byIngrType: e.target.value,
              })
            }
          >
            <option value="0" className="text-white bg-slate-800 sm:text-sm">
              Select One
            </option>
            {filteredContent.map((product) => (
              <option key={product.number} value={product.type} className="text-white bg-slate-800 sm:text-sm">
                {product.type}
              </option>
            ))}
          </select>
        </div>
        <div className="mr-1">
          <input
            type="number"
            min={1}
            className="text-white bg-transparent block w-full shadow-none sm:text-sm border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
            value={filters.byPriceValue}
            onChange={(e) =>
              setFilters({
                ...filters,
                byPriceValue: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="mr-1">
          <button
            type='button'
            className="menu-btn flex items-center"
            onClick={() =>
              setFilters({
                ...filters,
                byPriceBig: !filters.byPriceBig,
              })
            }
          >
            {filters.byPriceBig ? (
                <FaLessThanEqual className="h-6 w-6" />
              ) : (
                <FaGreaterThanEqual className="h-6 w-6" />
            )}
          </button>
        </div>
      </form>
      {
        productShowCard ? 
        (
          /* Product card Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {contentsArr?.map((item: Product) => <ProductCard key={item.number} product={item} /> )}
        </div>
        ) : (
          /* Product line Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {contentsArr?.map((item: Product) => (
              <div key={item.number} className="flex flex-col">
                <ProductLine product={item} />
              </div>
            ))}
          </div>
        )
      }
      
    </div>
  );
}


/*
<div className='mr-2 flex flex-row '>
                <input
                    type="number"
                    min={1}
                    className="text-black bg-gray-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mr-1 h-10"
                    value={filters.byNumber.value || 0}
                    onChange={(e) => {
                        setFilters({
                        ...filters,
                        byNumber: {
                        value : Number(e.target.value),
                        asc: true,
                        }
                    })}}
                />
                <button
                    className="menu-btn"
                    onClick={() => setFilters({
                    ...filters,
                    byNumber: {
                        ...filters.byNumber,
                        asc: !filters.byNumber.asc,
                    }
                })}
                >{ filters.byNumber.asc ? <HiArrowUp className="h-10 w-10"/> : <HiArrowDown className="h-10 w-10"/> }</button>
            </div>

            <div className='mr-2'>
                <input
                    type="text"
                    minLength={2}
                    maxLength={20}
                    placeholder='By Ingredient'
                    className="text-black bg-gray-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10"
                    value={filters.byIngredient || ""}
                    onChange={(e) => {
                        setFilters({
                        ...filters,
                        byIngredient: e.target.value
                    })}}
                />
            </div>
*/

/*

"use client"
import React, {useEffect, useState} from 'react'
import {HiArrowDown,HiArrowUp } from "react-icons/hi";
import ProductCard from './productCard';
import { Product } from '@prisma/client'

type filters = {
    byName: string,
    byNumberValue: number,
    byNumberAsc: boolean,
    byPriceValue: number,
    byPriceAsc: boolean,
    byIngredient: string,
  }


export default function Filters( {filteredContent} ) {
    const [contentsArr, setContentsArr] = useState<Product[]>(filteredContent);
    const [filters, setFilters] = useState<filters>({
        byName: "",
        byNumberValue: 0,
        byNumberAsc: true,
        byPriceValue: 0,
        byPriceAsc: true,
        byIngredient: "",
    });
    
    function handleFilterContentArr() {
        console.log("filters",filters)
        if(filters.byName === "" && filters.byPriceValue === 0){
            setContentsArr(filteredContent);
        } else {
            const filteredArr = contentsArr.filter((product) => {
                // Filter by name
                if (filters.byName !== "" && !product.name.toLowerCase().includes(filters.byName.toLowerCase())) {
                  return false;
                }
            
                // Filter by number
                if (filters.byNumberValue !== 0 && product.number !== filters.byNumberValue) {
                  return false;
                }
            
                // Filter by price
                if (filters.byPriceValue !== 0 && product.price > filters.byPriceValue) {
                  return false;
                }
            
                // Filter by ingredient
                if (filters.byIngredient !== "" && !product.ingredients.includes(filters.byIngredient)) {
                  return false;
                }
            
                return true;
              });
              setContentsArr(filteredArr);
        }        
    }

  return (
    <div className="flex flex-col justify-center p-4">
        <form onChange={() => handleFilterContentArr()} className="flex flex-row pb-4 mx-auto">
            <div className='mr-2'>
                <input
                    type="text"
                    minLength={2}
                    maxLength={20}
                    placeholder='By name'
                    className="text-black bg-gray-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10"
                    value={filters.byName || ""}
                    onChange={(e) => {
                        setFilters({
                            ...filters,
                            byName: e.target.value
                        })
                    }}
                />
            </div>
            <div className='mr-2 flex flex-row '>
                <input
                    type="number"
                    min={1}
                    className="text-black bg-gray-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mr-1 h-10"
                    value={filters.byPriceValue || 0}
                    onChange={(e) => {
                        setFilters({
                        ...filters,
                        byPriceValue : Number(e.target.value)
                    })}}
                />
                <button
                    className="menu-btn"
                    onClick={() => {
                        setFilters({
                        ...filters,
                        byPriceAsc : !filters.byPriceAsc,
                })}}
                >{ filters.byPriceAsc ? <HiArrowUp className="h-10 w-10"/> : <HiArrowDown className="h-10 w-10"/> }</button>
            </div>
                
        </form>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                contentsArr?.map((item : Product) => (
                <div key={item.number} className="w-full">
                    <ProductCard product={item} />
                </div>
                ))
            }
        </div>
      </div>
  )
}


*/