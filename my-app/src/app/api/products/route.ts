import { addProduct, getProducts } from "@/db/models/product";
import { productSchema } from "@/validators/product.validator";
import { z } from "zod";

export const GET = async () => {
  const products = await getProducts();
  return Response.json(products);
};

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const data = productSchema.parse(body);
    const newProduct = await addProduct(body);
    return Response.json(
      { message: "CREATED PRODUCT SUCCESFULLY", newProduct },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
  }
};
