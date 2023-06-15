"use client"
import React, { useState } from 'react';
import Image from 'next/image';

import hero from "../../../../public/pizza.png"

type Ingredient = {
    name: string,
    price: number
}

const productIng = [
  { price: 1,name: "Molho de tomate" },
  { price: 2,name: "Mozzarella" },
  { price: 1.5,name: "Fiambre" },
  { price: 1,name: "Cogumelos" },
  { price: 2,name: "Bacon" },
  { price: 1.5,name: "Chouriço" },
  { price: 2,name: "Pimentos" },
  { price: 1,name: "Azeitonas" },
  { price: 1,name: "Oregos" },

];

export default function ProductOverview({ product, ingredients }){
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const handleAddIngredient = (name, price) => {
    setSelectedIngredients([...selectedIngredients, {
        name,
        price,
    }]);
    setTotalPrice(totalPrice + price);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen ">
      <div className="flex flex-col md:flex-row p-4 rounded-lg shadow-md shadow-slate-600 h-screen sm:h-fit">
        <div className="md:w-3/5 p-2">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">{product.number}</h2>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <h2 className="text-2xl font-bold">{product.price}<span className="text-2xl font-bold ml-2">€</span></h2>
          </div>
          <Image src={product.photo || hero} alt={product.name} className='mx-auto'/>
          <p className="text-gray-500 mt-4">{product.description}
          The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.
          </p>
        </div>
        <div className="md:w-2/5 border-l border-slate-700 p-4">
          <h3 className="text-xl font-bold my-2">Ingredients</h3>
          <ul className='grid grid-cols-2'>
            {
              productIng.map((ingredient, index) => (
                <li key={index} className='text-sm text-gray-500'>{ingredient.name}</li>
              ))
            /*  
              product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))
            */
            }
          </ul>
          <h3 className="text-xl font-bold my-2">Add Ingredients</h3>
          <div className="flex gap-2 overflow-x-auto scroll-smooth">
            {/* list of available ingredients */

                productIng.map((ingredient, index) => (
                  <button
                      key={index} className="bg-tranparent text-white px-2 py-1 rounded-md"
                      onClick={() => {handleAddIngredient(ingredient.name, ingredient.price)}}
                  >
                      {ingredient.name}
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
          <div className="flex justify-between my-2">
            <h3 className="text-xl font-bold">Selected Ingredients</h3>
            <h3 className="text-2xl font-bold">{totalPrice}<span className="text-2xl font-bold ml-2">€</span></h3>
          </div>
          <ul className='grid grid-cols-2'>
            {selectedIngredients.map((ingredient,index) => (
              <li key={index} className='text-md text-white'>{ingredient.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};
