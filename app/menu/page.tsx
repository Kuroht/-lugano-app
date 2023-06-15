import React from 'react'
import MenuTab from '../components/menu/menuTab'
import { getProducts } from '@/prisma/products';
import { getIngredients } from '@/prisma/ingredients';
import { Product, Ingredients } from '@prisma/client';

export default async function page() {
  const products : Product[] = await getProducts();
  const ingredients : Ingredients[] = await getIngredients();

  return (
    <MenuTab products={products} ingredients={ingredients}/>
  )
}
