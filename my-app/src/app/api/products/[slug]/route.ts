import { getProductBySlug } from "@/db/models/product";
import { NextRequest } from "next/server";

export type GetProductDetailParam = {
  params: {
    slug: string;
  };
};

export const GET = async (
  request: Request,
  { params }: GetProductDetailParam
) => {
  const product = await getProductBySlug(params.slug);
  return Response.json(product);
};

//!JIKA INGIN MENCARI SEBUAH QUERY DARI CLIENT
// export const GET = async (
//   request: NextRequest,
//   { params }: GetUserDetailParam
// ) => {
//   console.log(request.nextUrl.searchParams.get("search"));
//   const users = await getUserById(params.id);
//   return Response.json(users);
// };
