import { MongoClient } from 'mongodb';

const client = new MongoClient('MONGODB_CONNECTION_STRING');
await client.connect();

export const db = client.db('blog_cms');