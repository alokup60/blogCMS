import { json } from '@sveltejs/kit';
import { connectMongo } from '$lib/mongodb'; // Adjust the import path if needed

export async function GET() {
	try {
		const db = await connectMongo();
		const collections = await db.listCollections().toArray(); // Fetch collections as a test
		return json({ success: true, message: 'MongoDB connected!', collections });
	} catch (error) {
		console.error('MongoDB Connection Error:', error);
		return json(
			{ success: false, message: 'Failed to connect to MongoDB', error: error.message },
			{ status: 500 }
		);
	}
}
