// import { db } from '$lib/mongo';
// import { json } from '@sveltejs/kit';

// export async function GET() {
// 	const posts = await db.collection('posts').find({}).toArray();
// 	return json(posts);
// }

// export async function PUT({ request }) {
// 	const { title, content, author_id, image_url } = await request.json();
// 	const slug = title.toLowerCase().replace(/\s+/g, '-');

// 	await db.collection('posts').insertOne({
// 		title,
// 		slug,
// 		content,
// 		author_id,
// 		image_url,
// 		created_at: new Date(),
// 		updated_at: new Date()
// 	});

// 	return json({ success: true });
// }
// --2nd
// import { connectMongo } from '$lib/mongodb';
// import { json } from '@sveltejs/kit';

// export async function GET() {
// 	try {
// 		const db = await connectMongo(); // Ensure the database connection is established
// 		const posts = await db.collection('posts').find({}).toArray();
// 		return json(posts);
// 	} catch (error) {
// 		console.error('MongoDB GET Error:', error);
// 		return json(
// 			{ success: false, message: 'Failed to fetch posts', error: error.message },
// 			{ status: 500 }
// 		);
// 	}
// }

// export async function PUT({ request }) {
// 	try {
// 		const { title, content, author_id, image_url } = await request.json();
// 		const slug = title.toLowerCase().replace(/\s+/g, '-');

// 		const db = await connectMongo(); // Ensure the database connection is established
// 		await db.collection('posts').insertOne({
// 			title,
// 			slug,
// 			content,
// 			author_id,
// 			image_url,
// 			created_at: new Date(),
// 			updated_at: new Date()
// 		});

// 		return json({ success: true });
// 	} catch (error) {
// 		console.error('MongoDB PUT Error:', error);
// 		return json(
// 			{ success: false, message: 'Failed to insert post', error: error.message },
// 			{ status: 500 }
// 		);
// 	}
// }

import { json } from '@sveltejs/kit';
import { connectMongo } from '$lib/mongodb';

export async function POST({ request }) {
	const db = await connectMongo();
	const { title, content } = await request.json();

	if (!title || !content) {
		return json({ error: 'Title and content are required' }, { status: 400 });
	}

	const slug = title.toLowerCase().replace(/\s+/g, '-');

	await db.collection('blogs').insertOne({
		title,
		slug,
		content,
		// coverImage: coverImage || '',
		created_at: new Date(),
		updated_at: new Date()
	});

	return json({ success: true, message: 'Blog saved successfully!' });
}
