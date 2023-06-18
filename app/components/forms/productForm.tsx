"use client"

import { useState, useEffect } from "react";

import { Product, Ingredients } from '@prisma/client';
import { HiTrash } from "react-icons/hi2";
import { useRouter } from 'next/navigation'
import axios from "axios";
import UploadForm from "./imageUploader";

export default function ProductForm(props : any) {
    const router = useRouter();
    
    const [formError, setFormError] = useState(false);
    const [formErrorString, setFormErrorString] = useState("");
    const [selectError, setSelectError] = useState(false);
    
    const [productForm, setProductForm] = useState({
        number: 1,
        name: "",
        price: 1,
        description: "0",
        ingredients: [],
        type: "",
        recommended: false,
        photo: ""
    });

    //Image
    const [fileImg, setFileImg] = useState<FormData>();

    const typeArr = ["Pizza", "Carnes", "Massas", "Saladas", "Extras"];

    function containsSpecialCharacters(input: string): boolean {
        const specialCharacterPattern: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return specialCharacterPattern.test(input);
    }

    useEffect( () => {
        if(props.product){
            const productValueForm = props.product;

            setProductForm({
                number: productValueForm.number,
                name: productValueForm.name,
                price: productValueForm.price,
                description: productValueForm.description,
                ingredients: productValueForm.ingredients,
                type: productValueForm.type,
                recommended: productValueForm.recommended,
                photo: productValueForm.photo,
            })

            setFormError(true);
            setFormErrorString("The form is the same as before");
        } else {
            axios.get('/api/products')
            .then(response => {
                const data = response.data;
                setProductForm(prevForm => ({
                ...prevForm,
                number: data + 1,
                }));
            })
            .catch(error => {
                // Handle the error
            });
            /*fetch("/api/products",{
                method: "GET",
            }).then((res) => res.json())
            .then((data) => {
                setProductForm({
                    ...productForm,
                    number: data + 1,
                })
            });*/
            setFormError(true);
            setFormErrorString("The form is not completed yet");
        }
      }, []);

    const ingredientOptions : Ingredients[] = [...props.ingredientsProps];

      function handleSelect(value: any){
        const ingredientSelect :Ingredients = ingredientOptions.find((ingredient) => ingredient.id === value);

        if(productForm.ingredients.find((ingredient :Ingredients) => ingredient.id === value)){
            setSelectError(true);
        } else {
            const ingredientsTemp = [...productForm.ingredients, ingredientSelect];
            setSelectError(false);
            setProductForm({
                ...productForm,
                ingredients: ingredientsTemp
            })
        }

        
      }

      async function uploadImgToCloudinary(){
        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
                fileImg
            );

            if (response.status === 200) {
                const data = response.data;
                
                return data.secure_url;
            }
        } catch (error) {
            console.log('Error uploading image:', error);
            setFormError(true);
            setFormErrorString('Failed to upload image. Please try again later.');
            return false;
        }
    }

      function removeSelect(ingredientValue: Ingredients) {
        const result = productForm.ingredients.filter((ingredient) => ingredient !== ingredientValue)

        setProductForm({
            ...productForm,
            ingredients: result
        })
      }

      async function handleSubmit(e: any) {
        e.preventDefault();

        if(!formError) {
            try {
                const imgDone = await uploadImgToCloudinary();
                if(imgDone){
                    if(props.product){
                        const productId = props.product.id;
                        axios.put(`/api/products/${productId}`, {
                            ...productForm,
                            photo: imgDone,
                        })
                        /*await fetch("/api/products/"+productId,{
                            method: "PUT",
                            body: JSON.stringify(productForm),
                        });*/
                    } else {
                        axios.post('/api/products', {
                            ...productForm,
                            photo: imgDone,
                        })
                        /*await fetch("/api/products",{
                            method: "POST",
                            body: JSON.stringify(productForm),
                        });*/
                    }
                    router.push('/dashboard/products');
                    router.refresh();
                }
            } catch (error) {
                console.log(error);
                window.confirm("Error adding to the dataBase, do u need to go back?")
            }
        } else {
            window.alert(formErrorString)
        }
      }

      function handleReset() {
        if(props.product){
            const productValueForm = props.product;

            setProductForm({
                number: productValueForm.number,
                name: productValueForm.name,
                price: productValueForm.price,
                description: productValueForm.description,
                ingredients: productValueForm.ingredients,
                type: productValueForm.type,
                recommended: productValueForm.recommended,
                photo: productValueForm.photo,
            })

            ;
        } else {
            setProductForm({
                number: 1,
                name: "",
                price: 1,
                description: "",
                ingredients: [],
                type: "",
                recommended: false,
                photo: "",
            })
        }
        setFormError(true);
        setFormErrorString("The form has been reseted");
      }

      function handleValidation(input : string, value : any){
        setFormError(false);
        setFormErrorString("");
        
        const specialCharVal = containsSpecialCharacters(value);

        if(specialCharVal){
            setFormError(true);
            setFormErrorString("It cant have special Characters");
        }

        if(props.product){
            const productValueForm = props.product;

            if(input === "number"){
                if( productValueForm.number === value ){
                    setFormError(true);
                    setFormErrorString("The number is the same as before");
                }
            } else if(input === "name"){
                if( productValueForm.name === value || value === "" ){
                    setFormError(true);
                    setFormErrorString("The name is the same as before or is empty");
                }
            } else if(input === "price"){
                if( productValueForm.price === value ){
                    setFormError(true);
                    setFormErrorString("The price is the same as before");
                }
            } else if(input === "description"){
                if( productValueForm.description === value ){
                    setFormError(true);
                    setFormErrorString("The price is the same as before");
                }   
            } else if(input === "type"){
                if( productValueForm.type === value || value === "" ){
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
            } else if(fileImg){
                setFormError(true);
                setFormErrorString("The photo is required");
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

  return (
    <div className="bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-300 p-4 rounded-lg w-[95%] md:w-4/5 mx-auto">
            <form onSubmit={(e) => handleSubmit(e)}>
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
                        value={productForm.number || 1}
                        onChange={(e) => {
                            handleValidation("number", e.target.value)
                            setProductForm({
                            ...productForm,
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
                        value={productForm.name || ""}
                        onChange={(e) => {
                            handleValidation("name", e.target.value)
                            setProductForm({
                            ...productForm,
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
                        value={productForm.price || 1}
                        onChange={(e) => {
                            handleValidation("price", e.target.value)
                            setProductForm({
                            ...productForm,
                            price: Number(e.target.value)
                        })}}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        minLength={2}
                        maxLength={100}
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={productForm.description || ""}
                        onChange={(e) => {
                            handleValidation("description", e.target.value)
                            setProductForm({
                            ...productForm,
                            description: e.target.value
                        })}}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        className="text-black mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md border-gray-300"
                        onChange={(e) => {
                            handleValidation("type", e.target.value)
                            setProductForm({
                            ...productForm,
                            type: e.target.value
                        })}}
                        value={productForm.type || "0"}
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
                                productForm.ingredients?.map((ingredient : Ingredients) => (
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
                        checked={productForm.recommended}
                        onChange={(e) => {
                            handleValidation("recommended", !productForm.recommended)
                            setProductForm({
                            ...productForm,
                            recommended: !productForm.recommended
                        })}}
                    />
                </div>
                <div className="mb-4">
                    <UploadForm setFileImg={setFileImg} photoProps={productForm.photo} />
                </div>
                <div className="flex justify-end">
                <button
                    type="button"
                    disabled={formError}
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${ formError ? "border-red-500" : "border-transparent" }`}
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
