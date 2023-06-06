import { getProductsLastNumber } from "@/prisma/products";
import { Product } from "@prisma/client";

export async function GET(request: Request) {
    try {
        const value :any = await getProductsLastNumber();
        console.log("APi get Product number",value.number);
        return new Response(value.number);
    } catch (error) {
        return new Response("error");
    }
}