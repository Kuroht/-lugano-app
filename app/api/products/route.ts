import { getProductsLastNumber, addProduct } from "@/prisma/products";
import { Product } from "@prisma/client";

export async function GET(request: Request) {
    try {
        const value :any = await getProductsLastNumber();
        return new Response(value.number);
    } catch (error) {
        return new Response("error");
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const result = await addProduct(body)

        return new Response(JSON.stringify(result));
    } catch (error) {
        return new Response("Error");
    }
}