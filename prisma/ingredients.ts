import prisma from "@/app/libs/prismadb";
import { Ingredients } from "@prisma/client";

export async function getIngredients() {
  const ingredients : Ingredients[] = await prisma.ingredients.findMany({
      orderBy: {
          number: "asc"
      }
  });
  return ingredients;
}

export async function getIngredientById(idString : string) {
  const ingredient : Ingredients = await prisma.ingredients.findFirst({
    orderBy: {
      number: 'asc'
    },
    where: {
      id: idString,
    }
  });
  return ingredient;
}

export async function getIngredientsLastNumber() {
  const number : any = await prisma.ingredients.findFirst({
    orderBy: {
      number: 'desc'
    },
    select: {
      number: true
    }
  });

  return number
  
}


export async function addIngredient(ingredient : Ingredients) {
  const result = await prisma.ingredients.create({
    data : {
      number: ingredient.number,
      name: ingredient.name,
      type: ingredient.type,
      price: ingredient.price,
      photo: ""
    }
  });

  console.log(result);

  return result;
}

export async function deleteIngredient(ingredientId: string) {
  const result = await prisma.ingredients.delete({
      where: {
        id: ingredientId,
      },
  });
  console.log(result);
  return result;
}

export async function addPhotoToIngredient(ingredientPhoto : string, ingredientId: string) {
  const result = await prisma.ingredients.update({
    where: {
      id: ingredientId,
    },
    data : {
      photo: ingredientPhoto,
    }
  });

  console.log(result);

  return result;
}

export async function editIngredient(ingredient : Ingredients, ingredientId: string) {
  const result = await prisma.ingredients.update({
    where: {
      id: ingredientId,
    },
    data : {
      number: ingredient.number,
      name: ingredient.name,
      type: ingredient.type,
      price: ingredient.price,
      photo: ingredient.photo,
    }
  });

  console.log(result);

  return result;
}