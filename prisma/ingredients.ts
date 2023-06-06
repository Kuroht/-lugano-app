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
