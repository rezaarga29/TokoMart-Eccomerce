import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const uri = process.env.URI_MONGODB;

// Create a new client and connect to MongoDB

let client: MongoClient;

export async function getMongoDbInstance() {
  if (!uri) {
    throw new Error("Please define the URI_MONGODB");
  }
  if (!client) {
    client = await MongoClient.connect(uri);
    await client.connect();
  }

  return client;
}
