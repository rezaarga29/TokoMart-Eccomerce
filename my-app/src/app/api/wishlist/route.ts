import {
  Wishlist,
  addWishlist,
  getWishlists,
  removeWishlist,
} from "@/db/models/wishlist";
import { wishlistSchema } from "@/validators/wishlist.validator";
import { z } from "zod";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

export const POST = async (req: Request) => {
  // console.log("jalan bos api nya");
  const headersList = headers();
  const userId = headersList.get("userId") as string;

  const body: Wishlist = await req.json();
  try {
    const data = wishlistSchema.parse({
      userId: userId,
      productId: body.productId,
    });
    const newWishlist = await addWishlist({
      userId: new ObjectId(userId),
      productId: body.productId,
    });
    return Response.json(
      { message: "ADDED WISHLIST SUCCESFULLY", newWishlist },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const { productId } = await req.json();
  console.log(productId);
  const deleteWishlist = await removeWishlist(productId);
  return Response.json(
    { message: "DELETED WISHLIST SUCCESFULLY", deleteWishlist },
    { status: 200 }
  );
};

export const GET = async () => {
  const headersList = headers();
  const userId = headersList.get("userId") as string;

  const wishlist = await getWishlists(userId);
  return Response.json(wishlist);
};
