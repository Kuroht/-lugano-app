import { deleteProduct,editProduct } from "@/prisma/products";

export async function PATCH(request: Request, {params}) {
    const body = await request.body
    
    console.log("body", body, "params", params);

    return new Response("Ok PATCH");
}

export async function PUT(request: Request, {params}) {
    try {
        const body = await request.json()
        const result = await editProduct(body, params.id)
        
        return new Response(JSON.stringify(result));
    } catch (error) {
        return new Response("Error");
    }
}

export async function DELETE(request: Request, {params}) {
    try {
        const result = await deleteProduct(params.id);

        return new Response(JSON.stringify(result));
    } catch (error) {
        return new Response("Error");
    }
}
