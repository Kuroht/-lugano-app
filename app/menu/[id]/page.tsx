import React from 'react'
import { Product, Ingredients } from '@prisma/client';
import ProductOverview from '@/app/components/menu/product/productOverview';
import { getIngredients } from '@/prisma/ingredients';
import { getProductById } from '@/prisma/products';

export default async function page({params}:any) {
  try {
    const ingredients : Ingredients[] = await getIngredients();
    const product : Product = await getProductById(params.id)

    return (
      <ProductOverview product={product} ingredients={ingredients} />
    );
  } catch (error) {
      console.log("Error", error);
  }
}