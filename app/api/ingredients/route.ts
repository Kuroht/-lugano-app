import { getIngredientsLastNumber, addIngredient } from "@/prisma/ingredients";
import { Product } from "@prisma/client";

export async function GET(request: Request) {
    try {
        const value :any = await getIngredientsLastNumber();
        return new Response(value.number);
    } catch (error) {
        return new Response("error");
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const result = await addIngredient(body)
        
        return new Response(JSON.stringify(result));
    } catch (error) {
        return new Response("Error");
    }
}

//https://www.youtube.com/watch?v=vrR4MlB7nBI&t=117s