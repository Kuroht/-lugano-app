import { Product, Ingredients } from '@prisma/client';
import IngredientForm from '@/app/components/forms/ingredientForm';
import { getIngredientById } from '@/prisma/ingredients';

export default async function page(props: any) {
    try {
        const ingredient : Product = await getIngredientById(props.params.id)

        return (
            <IngredientForm ingredient={ingredient}/>
        );
    } catch (error) {
        console.log("Error", error);
    }
}
