import React from 'react'
import MenuTab from '../components/menu/menuTab'
import { getProducts } from '@/prisma/products';
import { getIngredients } from '@/prisma/ingredients';
import { Product, Ingredients } from '@prisma/client';
import {useTranslations, useLocale} from 'next-intl';

async function getPropsForMenuTab(message : any){
  const products : Product[] = await getProducts();
  const ingredients : Ingredients[] = await getIngredients();

  return <MenuTab products={products} ingredients={ingredients} message={message} />;
} 

export default function page() {
  const t = useTranslations('MenuPage');
  const locale = useLocale();

  const message = {
    pizza : t("title.pizza"),
    pasta : t("title.pasta"),
    ingredient : t("title.ingredient"),
    other : t("title.other"),
    filters : {
      sorterName : t("filters.sorterName"),
      select : t("filters.select")
    },
    locale : locale 
  }

  return (
    <main className="h-screen w-full">
      {getPropsForMenuTab(message)}
    </main>
  )
}
