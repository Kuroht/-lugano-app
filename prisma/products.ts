import prisma from "@/app/libs/prismadb";
import { Product } from "@prisma/client";

export async function getProducts() {
  const products : Product[] = await prisma.product.findMany({
      orderBy: {
          number: "asc"
      }
  });
  return products;
}

export async function getProductByNumber(idString : string) {
  const product : Product = await prisma.product.findFirst({
    orderBy: {
      number: 'asc'
    },
    where: {
      id: idString,
    }
  });
  console.log(product);
  return product;
}


export async function findIfNumberExists(numberProp) {
  const found  = await prisma.product.findFirst({
    orderBy: {
      number: 'asc'
    },
    select: {
      number: true
    },
    where: {
      number: numberProp,
    }
  });
  if(found){
    return true;
  } else {
    return false;
  }
}

export async function getProductsLastNumber() {
  const number : any = await prisma.product.findFirst({
    orderBy: {
      number: 'desc'
    },
    select: {
      number: true
    }
  });

  return number
  
}
