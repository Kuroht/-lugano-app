import { deleteIngredient } from "@/prisma/ingredients";


export async function PATCH(request: Request, {params}) {
    const body = await request.body
    
    console.log("body", body, "params", params);

    return new Response("Ok PATCH");
}

export async function PUT(request: Request, {params}) {
    const body = await request.json()
    
    console.log("body", body, "params", params);

    return new Response("Ok PUT");
}

export async function DELETE(request: Request, {params}) {
    try {
        const result = await deleteIngredient(params.id);

        return new Response(JSON.stringify(result));
    } catch (error) {
        return new Response("Error");
    }
}
