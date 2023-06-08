import { Product, Ingredients } from '@prisma/client';
import ProductForm from '@/app/components/forms/productForm';
import { getIngredients } from '@/prisma/ingredients';
import { getProductById } from '@/prisma/products';

export default async function page(props: any) {
    try {
        const ingredients : Ingredients[] = await getIngredients();
        const product : Product = await getProductById(props.params.id)

        console.log(product);

        return (
            <ProductForm ingredientsProps={ingredients} product={product}/>
        );
    } catch (error) {
        console.log("Error", error);
    }
}
