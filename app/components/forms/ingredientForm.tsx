"use client"

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";

export default function IngredientForm(props : any) {
    const router = useRouter();

    const [formError, setFormError] = useState(false);
    const [formErrorString, setFormErrorString] = useState("");
    
    const [ingredientForm, setIngredientForm] = useState({
        name: "",
        number: 1,
        price: 1,
        type: "0"
    });

    const typeArr = ["Carnes", "Queijos", "Molhos", "Peixes", "Fruta/Legumes", "Massa"]

    function containsSpecialCharacters(input: string): boolean {
        const specialCharacterPattern: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return specialCharacterPattern.test(input);
    }

    useEffect( () => {
        if(props.ingredient){
            const ingredientValueForm = props.ingredient;

            setIngredientForm({
                number: ingredientValueForm.number,
                name: ingredientValueForm.name,
                price: ingredientValueForm.price,
                type: ingredientValueForm.type
            })
            setFormError(true);
            setFormErrorString("The form is the same as before");
        } else {
            axios.get('/api/ingredients')
            .then(response => {
                const data = response.data;
                setIngredientForm(prevForm => ({
                ...prevForm,
                number: data + 1,
                }));
            })
            .catch(error => {
                // Handle the error
            });
            /*fetch("/api/ingredients",{
                method: "GET",
            }).then((res) => res.json())
            .then((data) => {
                setIngredientForm({
                    ...ingredientForm,
                    number: data + 1,
                })
            });*/
            setFormError(true);
            setFormErrorString("The form is not completed yet");
        }
      }, []);

    function handleValidation(input : string, value : any){
        setFormError(false);
        setFormErrorString("");
        
        const specialCharVal = containsSpecialCharacters(value);

        if(specialCharVal){
            setFormError(true);
            setFormErrorString("It cant have special Characters");
        }

        if(props.ingredient){
            const ingredientValueForm = props.ingredient;

            if(input === "number"){
                if( ingredientValueForm.number === value ){
                    setFormError(true);
                    setFormErrorString("The number is the same as before");
                }
            } else if(input === "name"){
                if( ingredientValueForm.name === value || value === "" ){
                    setFormError(true);
                    setFormErrorString("The name is the same as before or is empty");
                }
            } else if(input === "price"){
                if( ingredientValueForm.price === value ){
                    setFormError(true);
                    setFormErrorString("The price is the same as before");
                }
            } else if(input === "type"){
                if( ingredientValueForm.type === value || value === "" ){
                    setFormError(true);
                    setFormErrorString("The type is the same as before or empty");
                } else {
                    if(!typeArr.map((type) => type === value)){
                        setFormError(true);
                        setFormErrorString("The type does not exists");
                    }
                }
            }
        } else {
            if(input === "number"){
                if( value === 0 ){
                    setFormError(true);
                    setFormErrorString("The number cant be 0");
                }
            } else if(input === "name"){
                if( value === "" ){
                    setFormError(true);
                    setFormErrorString("The name cant be empty");
                }
            } else if(input === "price"){
                if( value === 0 ){
                    setFormError(true);
                    setFormErrorString("The price cant be 0");
                }
            } else if(input === "type"){
                if( value === "" ){
                    setFormError(true);
                    setFormErrorString("The type cant be empty");
                } else {
                    if(!typeArr.map((type) => type === value)){
                        setFormError(true);
                        setFormErrorString("The type does not exists");
                    }
                }
            }
        }
        
      }

      function handleSubmit(e: any) {
        e.preventDefault();

        if(!formError) {
            try {
                if(props.ingredient){
                    const ingredientId = props.ingredient.id;
                    axios.put(`/api/ingredients/${ingredientId}`, ingredientForm)

                    /*await fetch("/api/ingredients/"+ingredientId,{
                        method: "PUT",
                        body: JSON.stringify(ingredientForm),
                    });*/
                } else {
                    axios.post('/api/ingredients', ingredientForm)
                    /*await fetch("/api/ingredients",{
                        method: "POST",
                        body: JSON.stringify(ingredientForm),
                    });*/
                }
                router.replace('/dashboard/ingredients');
            } catch (error) {
                console.log(error);
                window.confirm("Error adding to the dataBase, do u need to go back?")
            }
        } else {
            window.alert(formErrorString)
        }
      }

      function handleReset() {
        if(props.ingredient){
            const ingredientValueForm = props.ingredient;

            setIngredientForm({
                number: ingredientValueForm.number,
                name: ingredientValueForm.name,
                price: ingredientValueForm.price,
                type: ingredientValueForm.type
            })

        } else {
            setIngredientForm({
                number: 1,
                name: "",
                price: 1,
                type: "0"
            })
        }
        setFormError(true);
        setFormErrorString("The form has been reseted");
      }
      
  return (
    <div className="bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-300 p-4 rounded-lg w-[95%] md:w-4/5 mx-auto">
            <form onSubmit={ (e) => handleSubmit(e)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Number
                    </label>
                    <input
                        type="number"
                        required
                        min={1}
                        pattern="^\d+$"
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={ingredientForm.number || 1}
                        onChange={(e) => {
                            handleValidation("number", e.target.value)
                            setIngredientForm({
                            ...ingredientForm,
                            number: Number(e.target.value)
                        })}}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        pattern="[a-z0-9]{2,48}"
                        minLength={2}
                        maxLength={48}
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={ingredientForm.name || ""}
                        onChange={(e) => {
                            handleValidation("name", e.target.value)
                            setIngredientForm({
                            ...ingredientForm,
                            name: e.target.value
                        })}}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        required
                        min={1}
                        pattern="^[1-9]\d*(\.\d{2})?$"
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={ingredientForm.price || 1}
                        onChange={(e) => {
                            handleValidation("price", e.target.value)
                            setIngredientForm({
                            ...ingredientForm,
                            price: Number(e.target.value)
                        })}}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md border-gray-300"
                        onChange={(e) => {
                            handleValidation("type", e.target.value)
                            setIngredientForm({
                            ...ingredientForm,
                            type: e.target.value
                        })}}
                        value={ingredientForm.type || "0"}
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
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 border-transparent"
                    onClick={(e) => handleSubmit(e)}
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


