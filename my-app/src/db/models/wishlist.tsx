import { Db, ObjectId } from "mongodb";
import { getMongoDbInstance } from "../config";
import Wishlist from "@/components/wishlist";
import { Product } from "./product";
const DB_NAME = process.env.MONGODB_NAME;
const COLLECTION_WISHLIST = "wishlists";

export type Wishlist = {
  _id?: ObjectId | string;
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  Product?: Product;
};

export const getDb = async () => {
  const client = await getMongoDbInstance();
  const db = client.db(DB_NAME);
  return db;
};

export const getWishlists = async (userId: string) => {
  const db = await getDb();
  return db
    .collection<Wishlist>(COLLECTION_WISHLIST)
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "Product",
        },
      },
      {
        $unwind: {
          path: "$Product",
          preserveNullAndEmptyArrays: false,
        },
      },
    ])
    .toArray();
};

export const getWishlistById = async (id: string | ObjectId) => {
  const db = await getDb();

  const objectId = typeof id === "string" ? ObjectId : id;
  return db
    .collection<Wishlist>(COLLECTION_WISHLIST)
    .findOne({ _id: objectId });
};

export const addWishlist = async (newWishlist: Wishlist) => {
  const db = await getDb();

  const { userId, productId } = newWishlist;

  const existingWishlist = await db
    .collection<Wishlist>(COLLECTION_WISHLIST)
    .findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });
  if (existingWishlist) {
    throw new Error("Product already on wishlist");
  }

  const currentTime = new Date();
  newWishlist.userId = new ObjectId(userId);
  newWishlist.productId = new ObjectId(productId);
  newWishlist.createdAt = currentTime;
  newWishlist.updatedAt = currentTime;

  const { insertedId } = await db
    .collection<Wishlist>(COLLECTION_WISHLIST)
    .insertOne(newWishlist);
  return await getWishlistById(insertedId);
};

export const removeWishlist = async (id: string) => {
  const db = await getDb();
  console.log(id);
  const data = db
    .collection<Wishlist>(COLLECTION_WISHLIST)
    .deleteOne({ _id: new ObjectId(id) });

  return data;
};

// static async addFollowing({ followingId, followerId }) {
//     if (followingId === followerId) {
//       throw new Error("Cannot follow yourself");
//     }
//     const existingFollow = await this.collection().findOne({
//       followingId: new ObjectId(followingId),
//       followerId: new ObjectId(followerId),
//     });
//     if (existingFollow) {
//       throw new Error("Already followed");
//     }
//     return await this.collection().insertOne({
//       followingId: new ObjectId(followingId),
//       followerId: new ObjectId(followerId),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
//   }
