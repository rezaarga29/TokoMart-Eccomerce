import { ObjectId } from "mongodb";
import { getMongoDbInstance } from "../config";
const DB_NAME = process.env.MONGODB_NAME;
const COLLECTION_PRODUCTS = "products";

export type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  price?: number;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export const getDb = async () => {
  const client = await getMongoDbInstance();
  const db = client.db(DB_NAME);
  return db;
};

export const getProducts = async () => {
  const db = await getDb();

  return await db.collection<Product>(COLLECTION_PRODUCTS).find().toArray();
};

export const getProductById = async (id: string | ObjectId) => {
  const db = await getDb();

  const objectId = typeof id === "string" ? ObjectId : id;

  return db.collection<Product>(COLLECTION_PRODUCTS).findOne({ _id: objectId });
};

export const getProductBySlug = async (slug: string) => {
  const db = await getDb();

  return db.collection<Product>(COLLECTION_PRODUCTS).findOne({ slug });
};

export const getProductByName = async (name: string) => {
  const db = await getDb();

  return db.collection<Product>(COLLECTION_PRODUCTS).find({
    name: { $regex: new RegExp(name, "i") },
  });
};

export const addProduct = async (newProduct: Product) => {
  const db = await getDb();

  const currentTime = new Date();
  newProduct.createdAt = currentTime;
  newProduct.updatedAt = currentTime;

  const { insertedId } = await db
    .collection<Product>(COLLECTION_PRODUCTS)
    .insertOne(newProduct);

  return await getProductById(insertedId);
};
