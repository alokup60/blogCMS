import { connectMongo } from '$lib/mongodb';

export async function load({ params }) {
	const db = await connectMongo();
	const blog = await db.collection('blogs').findOne({ slug: params.slug });

	if (!blog) {
		throw new Error('Blog not found');
	}

	// Convert MongoDB `_id` to a string
	blog._id = blog._id.toString();

	return { blog };
}
