"use client"

import { useState, useEffect } from "react";

import { Product, Ingredients } from '@prisma/client';
import { HiTrash } from "react-icons/hi2";

export default function ProductForm(props : any) {
    const [number, setNumber] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [ingredients, setIngredients] = useState<Ingredients[]>([]);
    const [descr, setDescr] = useState("");
    const [recommended, setRecommended] = useState(false);

    const [formError, setformError] = useState(false);
    const [selectError, setSelectError] = useState(false);
    
    const [productForm, setProductForm] = useState({});

    useEffect( () => {
        if(props.product){
            const productValueForm = props.product;

            setNumber(productValueForm.number);
            setName(productValueForm.name);
            setPrice(productValueForm.price);
            setDescr(productValueForm.description);
            setIngredients(productValueForm.ingredients);
            setRecommended(productValueForm.recommended);

            handleValidation();
        } else {
            fetch("/api/products",{
                method: "GET",
            }).then((res) => res.json())
            .then((data) => {
                setNumber(data + 1);
            });

        }
      }, []);

    const ingredientOptions : Ingredients[] = [...props.ingredientsProps];

      function handleSelect(value: any){
        const ingredientSelect :Ingredients = ingredientOptions.find((ingredient) => ingredient.id === value);

        if(ingredients.find((ingredient) => ingredient.id === value)){
            setSelectError(true);
        } else {
            const ingredientsTemp = [...ingredients, ingredientSelect];
            setSelectError(false);
            setIngredients(ingredientsTemp)
        }

        handleValidation()
      }
      
      function removeSelect(ingredientValue: Ingredients) {
        setIngredients((oldValues) => {
            return oldValues.filter((ingredient) => ingredient !== ingredientValue)
        })

        handleValidation()
      }

      function handleSubmit() {
        handleValidation()


      }

      function handleReset() {

      }

      function handleValidation() {
        if(number === 0 || name === "" || price === 0 || descr === "" || ingredients.length === 0){
            setformError(true);
        } else if(number === 0){
        } else {
            setformError(false);
        }

        setProductForm({
            number: number,
            name: name,
            price: price,
            descr: descr,
            recommended: recommended,
            ingredients: [...ingredients],
        })

      }

  return (
    <div className="bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-300 p-4 rounded-lg w-[95%] md:w-4/5 mx-auto">
            <form onChange={() => handleValidation()}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Number
                    </label>
                    <input
                        type="number"
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={number}
                        onChange={(e) => setNumber(Number(e.target.value))}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={descr}
                        onChange={(e) => setDescr(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Ingredients
                    </label>
                    <select
                        className={`text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md ${selectError ? "border-red-500" : "border-gray-300"}`}
                        onChange={(e) => {
                            handleSelect(e.target.value)
                            e.target.value = "0"
                        }}
                        >
                            <option value="0">
                                Select One
                            </option>
                        {
                            ingredientOptions.map((ingredient) => (
                                <option key={ingredient.id} value={ingredient.id}>
                                    {ingredient.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Ingredients
                    </label>
                    <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-4">
                            {
                                ingredients?.map((ingredient : Ingredients) => (
                                    <div key={ingredient.id} className="flex">
                                        <label className="block text-sm text-center font-medium text-gray-700">
                                            {ingredient.name}
                                        </label>
                                        <button type="button" onClick={() => removeSelect(ingredient)}><HiTrash className="text-gray-500 cursor-pointer"/></button>
                                    </div>
                                ))
                            }
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Recommended
                    </label>
                    <input
                        type="checkbox"
                        className="mt-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        checked={recommended}
                        onChange={(e) => setRecommended(Boolean(e.target.value))}
                    />
                </div>
                <div className="flex justify-end">
                <button
                    type="button"
                    disabled={formError}
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${ formError ? "border-red-500" : "border-transparent" }`}
                    onClick={(e) => handleSubmit()}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={(e) => handleReset()}
                >
                    Reset
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}
