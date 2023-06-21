"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import hero from "../../../../../public/pizza.png"

type Ingredient = {
    name: string,
    nameEn: string,
    price: number,
    qty: number,
}

const typeArr = ["meats", "cheeses", "sauces", "fish", "fruitsVegetables", "pasta"];
interface DisplayNames {
  [key: string]: string;
}

type Filters = {
  byName: string;
  byIngrType: string;
};

export default function ProductOverview({ product, ingredients, messages }){
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [buttonIngredients, setButtonIngredients] = useState<Ingredient[]>([]);
  const [totalPrice, setTotalPrice] = useState(product.price);
  
  const [filters, setFilters] = useState<Filters>({
    byName: '',
    byIngrType: '',
  });
  
  const displayNames: DisplayNames = {
    meats: messages.filters.meats, 
    cheeses: messages.filters.cheeses, 
    sauces: messages.filters.sauces, 
    fish: messages.filters.fish, 
    fruitsVegetables: messages.filters.fruitsVegetables, 
    pasta: messages.filters.pasta, 
  };
  
  const handleAddIngredient = (name: string, nameEn: string, price: number) => {
    const ingredientIndex = selectedIngredients.findIndex((ingredient) => ingredient.name === name || ingredient.nameEn === nameEn);

    if (ingredientIndex !== -1) {
      // If ingredient is found, update the quantity
      const updatedIngredients = [...selectedIngredients];
      updatedIngredients[ingredientIndex] = {
        ...updatedIngredients[ingredientIndex],
        qty: updatedIngredients[ingredientIndex].qty + 1,
      };
      setSelectedIngredients(updatedIngredients);
    } else {
      // If ingredient is not found, add a new ingredient object to the array
      setSelectedIngredients([
        ...selectedIngredients, {
          name,
          nameEn,
          price,
          qty: 1,
        },
      ]); 
    }
    
    setTotalPrice(totalPrice + price);
  };

  useEffect(() => {
    handleFilterContentArr();
  }, [filters, ingredients]);

  function handleDelete(name: string, price: number){
    const updatedIngredients = selectedIngredients.map((ingredient) => {
      if (ingredient.name === name) {
        if (ingredient.qty > 1) {
          return { ...ingredient, qty: ingredient.qty - 1 };
        } else {
          return null; // Removing the ingredient by returning null
        }
      }
      return ingredient;
    });
  
    const filteredIngredients = updatedIngredients.filter((ingredient) => ingredient !== null);
  
    setSelectedIngredients(filteredIngredients);
    setTotalPrice(totalPrice - price);
  }

  function handleFilterContentArr() {
    const filteredArr = ingredients?.filter((ingredient) => {
      // Filter by name
      if (
        filters.byName !== '' &&
        !ingredient.name.toLowerCase().includes(filters.byName.toLowerCase()) &&
        !ingredient.nameEn.toLowerCase().includes(filters.byName.toLowerCase())
      ) {
        return false;
      }

      // Filter by ingredient type
      if (
        filters.byIngrType !== '0' &&
        !ingredient.type.toLowerCase().includes(filters.byIngrType.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setButtonIngredients(filteredArr);
  }

  return (
    <div className="container mx-auto p-4 h-fit">
      <div className="flex flex-col md:flex-row px-4 py-16 rounded-lg shadow-md shadow-slate-600 h-full">
        <div className="md:w-3/5 p-2">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">{product.number}</h2>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <h2 className="text-2xl font-bold">{product.price}<span className="text-2xl font-bold ml-2">€</span></h2>
          </div>
          <Image src={product.photo || hero} alt={product.name} className='mx-auto' width={300} height={300}/>
          <p className="text-gray-500 mt-4">
            {product.description}
          </p>
        </div>
        <div className="md:w-2/5 border-t md:border-l md:border-t-0 border-slate-700 p-4">
          <h3 className="text-xl font-bold my-2">{messages.ingredients}</h3>
          <ul className='grid grid-cols-2'>
            {
              product.ingredients.map((ingredient, index) => (
                <li key={index} className='text-sm text-gray-500'>{messages.locale !== "en" ? ingredient.name : ingredient.nameEn}</li>
              ))
            /*  
              product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))
            */
            }
          </ul>
          <div className='flex justify-evenly'>
            <h3 className="text-xl font-bold mt-8 mb-4">{messages.Addingredients}</h3>
            <div className="mr-1 flex items-center">
              <input
                type="text"
                minLength={2}
                maxLength={20}
                placeholder={messages.filters.sorterName}
                className="text-white bg-transparent block w-20 shadow-none sm:text-sm border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
                value={filters.byName}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    byName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mr-1 flex items-center">
              <select
                className="text-white bg-transparent w-20 shadow-none sm:text-sm border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 appearance-none"
                value={filters.byIngrType}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    byIngrType: e.target.value,
                  })
                }
              >
                <option value="0" className="text-white bg-slate-800 sm:text-sm">
                  {messages.filters.select}
                </option>
                {typeArr.map((ingredient) => (
                  <option key={ingredient} value={ingredient} className="text-white bg-slate-800 sm:text-sm">
                    {displayNames[ingredient]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto scroll-smooth h-20">
            {/* list of available ingredients */

                buttonIngredients.map((ingredient, index) => (
                  <button
                      key={index} className="bg-tranparent text-white px-2 py-1 rounded-md h-16 md:h-20"
                      onClick={() => {handleAddIngredient(ingredient.name, ingredient.nameEn, ingredient.price)}}
                  >
                      {messages.locale !== "en" ? ingredient.name : ingredient.nameEn}
                  </button>
                ))
              /*
                ingredients.map((ingredient, index) => (
                  <button
                      key={index} className="bg-tranparent text-white px-2 py-1 rounded-md"
                      onClick={() => handleAddIngredient(ingredient.name, ingredient.price)}
                  >
                      {ingredient.name}
                  </button>
              ))
              */
            }
          </div>
          <div className="flex justify-between mt-8 mb-4">
            <h3 className="text-xl font-bold">{messages.Selectedingredients}</h3>
            <h3 className={`text-2xl font-bold ${product.price === totalPrice ? "hidden" : ""}`}>{totalPrice}<span className="text-2xl font-bold ml-2">€</span></h3>
          </div>
          <ul className='grid grid-cols-2'>
            {selectedIngredients.map((ingredient,index) => (
              <li key={index} className='text-md text-white'>
                <span className={`text-md text-white ${ ingredient.qty === 1 ? "hidden" : "" }`}> {ingredient.qty} x </span>
                {messages.locale !== "en" ? ingredient.name : ingredient.nameEn}
                <button
                  type='button'
                  className="bg-tranparent text-red-500 rounded-md ml-2"
                  onClick={() => handleDelete(ingredient.name, ingredient.price)}>
                    x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};
