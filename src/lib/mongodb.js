import { MongoClient } from 'mongodb';
import { MONGO_URI } from '$env/static/private'; // Correct way to import environment variables in SvelteKit

const dbName = 'blogcms';
let client;
let db;

async function connectMongo() {
	if (!client) {
		client = new MongoClient(MONGO_URI); // No need for useNewUrlParser & useUnifiedTopology
		await client.connect();
		db = client.db(dbName);
		console.log('Connected to MongoDB');
	}
	return db;
}

export { connectMongo };
