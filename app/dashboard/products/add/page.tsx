import { Product, Ingredients } from '@prisma/client';
import ProductForm from '@/app/components/products/productForm';
import { getIngredients } from '@/prisma/ingredients';

export default async function page() {
    try {
        const ingredients : Ingredients[] = await getIngredients();

        return (
            <ProductForm ingredientsProps={ingredients} />
        );
    } catch (error) {
        console.log("Error", error);
    }
}
