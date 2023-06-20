import React from 'react'
import { Product, Ingredients } from '@prisma/client';
import ProductOverview from '../../components/menu/product/productOverview';
import { getIngredients } from '@/prisma/ingredients';
import { getProductById } from '@/prisma/products';
import {useTranslations} from 'next-intl';
import {useLocale} from 'next-intl';
import {notFound} from 'next/navigation';

async function getPropsForOverview(id : string, messages: any, locale: string ){
  try {
    const ingredients : Ingredients[] = await getIngredients();
    const product : Product = await getProductById(id)

    return <ProductOverview product={product} ingredients={ingredients} messages={messages} locale={locale}/>;
  } catch (error) {
      console.log("Error", error);
  }
} 

export default function page({params}:any) {
  const t = useTranslations('ProductOverview');
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  const messages = {
    ingredients : t("ingredients"),
    Addingredients : t("Addingredients"),
    Selectedingredients : t("Selectedingredients"),
    byName : t("byName"),
    SelectOne : t("SelectOne")
  }

  return (
    <main className="h-screen w-full">
      {getPropsForOverview(params.id, messages, locale)}
    </main>
  )
}
