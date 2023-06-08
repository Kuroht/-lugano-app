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

export async function getProductById(idString : string) {
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

export async function addProduct(product : Product) {
  const result = await prisma.product.create({
    data : {
      number: product.number,
      name: product.name,
      ingredients: product.ingredients,
      type: product.type,
      description: product.description,
      price: product.price,
      recommended: product.recommended,
      photo: ""
    }
  });

  console.log(result);

  return result;
}

export async function deleteProduct(productId: string) {
  const result = await prisma.product.delete({
      where: {
        id: productId,
      },
  });
  console.log(result);
  return result;
}

export async function addPhotoToProduct(productPhoto : string, productId: string) {
  const result = await prisma.product.update({
    where: {
      id: productId,
    },
    data : {
      photo: productPhoto,
    }
  });

  console.log(result);

  return result;
}

export async function editProduct(product : Product, productId: string) {
  const result = await prisma.product.update({
    where: {
      id: productId,
    },
    data : {
      number: product.number,
      name: product.name,
      ingredients: product.ingredients,
      type: product.type,
      description: product.description,
      price: product.price,
      recommended: product.recommended,
      photo: product.photo,
    }
  });

  console.log(result);

  return result;
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
