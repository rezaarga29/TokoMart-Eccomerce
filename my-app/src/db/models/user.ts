import { ObjectId } from "mongodb";
import { getMongoDbInstance } from "../config";
import { hashPassword } from "@/utils/bcrypt";
import { TUser } from "@/validators/user.validator";
const DB_NAME = process.env.MONGODB_NAME;
const COLLECTION_USERS = "users";

export type User = TUser;

export const getDb = async () => {
  const client = await getMongoDbInstance();
  const db = client.db(DB_NAME);
  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  return db
    .collection<User>(COLLECTION_USERS)
    .find()
    .project({ password: 0 })
    .toArray();
};

export const getUserById = async (id: string | ObjectId) => {
  const db = await getDb();

  const objectId = typeof id === "string" ? ObjectId : id;

  return db
    .collection<User>(COLLECTION_USERS)
    .findOne({ _id: objectId }, { projection: { password: 0 } });
};

export const register = async (newUser: User) => {
  const db = await getDb();

  newUser.password = hashPassword(newUser.password);

  const { insertedId } = await db
    .collection<User>(COLLECTION_USERS)
    .insertOne(newUser);

  return await getUserById(insertedId);
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();

  return db.collection<User>(COLLECTION_USERS).findOne({ email: email });
};

// export const getUserByEmail = async (email: string) => {
//   const db = await getDb();

//   return db
//     .collection<User>(COLLECTION_USERS)
//     .find({ email })
//     .project({ password: 0 })
//     .toArray();
// };
