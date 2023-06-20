import React from 'react'
import MenuTab from '../components/menu/menuTab'
import { getProducts } from '@/prisma/products';
import { getIngredients } from '@/prisma/ingredients';
import { Product, Ingredients } from '@prisma/client';
import {useTranslations} from 'next-intl';

async function getPropsForMenuTab(){
  const products : Product[] = await getProducts();
  const ingredients : Ingredients[] = await getIngredients();

  return <MenuTab products={products} ingredients={ingredients}/>;
} 

export default function page() {
  const t = useTranslations('MenuPage');

  return (
    <main className="h-full w-full">
      {t('title.pizza')}
      {getPropsForMenuTab()}
    </main>
  )
}
