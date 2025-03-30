import { json } from '@sveltejs/kit';
import { connectMongo } from '$lib/mongodb';

export async function GET() {
	const db = await connectMongo();

	// Fetch all blogs and sort them by latest created date
	const blogs = await db.collection('blogs')
		.find({})
		.sort({ created_at: -1 })
		.toArray();

	return json(blogs);
}
