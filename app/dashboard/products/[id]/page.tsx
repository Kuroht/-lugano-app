import { Product, Ingredients } from '@prisma/client';
import ProductForm from '@/app/components/products/productForm';
import { getIngredients } from '@/prisma/ingredients';
import { getProductByNumber } from '@/prisma/products';

export default async function page(props: any) {
    try {
        const ingredients : Ingredients[] = await getIngredients();
        const product : Product = await getProductByNumber(props.params.id)

        console.log(product);

        return (
            <ProductForm ingredientsProps={ingredients} product={product}/>
        );
    } catch (error) {
        console.log("Error", error);
    }
}
