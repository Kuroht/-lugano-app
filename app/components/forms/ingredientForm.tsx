"use client"

import { useState, useEffect } from "react";

export default function IngredientForm(props : any) {
    const [number, setNumber] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");

    const [formError, setformError] = useState(false);
    
    const [ingredientForm, setIngredientForm] = useState({});

    const typeArr = ["Carnes", "Queijos", "Molhos", "Peixes", "Fruta/Legumes", "Massa"]

    useEffect( () => {
        if(props.ingredient){
            const ingredientValueForm = props.ingredient;

            setNumber(ingredientValueForm.number);
            setName(ingredientValueForm.name);
            setPrice(ingredientValueForm.price);
            setType(ingredientValueForm.type);

        } else {
            fetch("/api/ingredients",{
                method: "GET",
            }).then((res) => res.json())
            .then((data) => {
                setNumber(data + 1);
            });

        }
      }, []);

      async function handleSubmit() {
       handleValidation()
        if(!formError) {
            if(props.ingredient){
                const ingredientId = props.ingredient.id;
                await fetch("/api/ingredients/"+ingredientId,{
                    method: "PUT",
                    body: JSON.stringify(ingredientForm),
                });
            } else {
                await fetch("/api/ingredients",{
                    method: "POST",
                    body: JSON.stringify(ingredientForm),
                });
            }
        } else {
            console.log("There must be and error")
        }
      }

      function handleReset() {
        if(props.ingredient){
            const ingredientValueForm = props.ingredient;

            setNumber(ingredientValueForm.number);
            setName(ingredientValueForm.name);
            setPrice(ingredientValueForm.price);
            setType(ingredientValueForm.type);

        } else {
            setNumber(0);
            setName("");
            setPrice(0);
            setType("0");
        }
      }

      function handleValidation() {
        console.log(type);
        if(number === 0 || name === "" || price === 0 || type === "0" ){
            setformError(true);
        } else {
            if(props.ingredient){
                const ingredientValueForm = props.ingredient;
    
                if(number === ingredientValueForm.number ||
                    name === ingredientValueForm.name ||
                    price === ingredientValueForm.price ||
                    type === ingredientValueForm.type)
                {
                    setformError(true); 
                } else {
                    setformError(false); 
                }
            } else {
                setformError(false);    
            }
        }

        setIngredientForm({
            number: number,
            name: name,
            price: price,
            type: type,
        })
        console.log(ingredientForm);
      }

  return (
    <div className="bg-opacity-50 flex items-center justify-center">
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
                        Type
                    </label>
                    <select
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md border-gray-300"
                        onChange={(e) => setType(e.target.value)}
                        >
                            <option value="0">
                                Select One
                            </option>
                        {
                            typeArr.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))
                        }
                    </select>
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
