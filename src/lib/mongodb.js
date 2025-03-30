import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGO_URI; // Access the MongoDB URI from the .env file
const dbName = 'blogcms';  // You can define your database name here

let db;

async function connectMongo() {
  if (db) return db;  // If already connected, return the existing connection

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();  // Connect to MongoDB
  db = client.db(dbName);  // Use your database
  console.log("Connected to MongoDB");
  return db;
}

export { connectMongo };
