// // src/lib/auth.js
// import supabase from './supabase';

// // Sign-up function
// export const signUp = async (email, password) => {
// 	const { user, error } = await supabase.auth.signUp({ email, password });
// 	if (error) throw error;
// 	return user;
// };

// // Login function
// export const signIn = async (email, password) => {
// 	const { user, error } = await supabase.auth.signInWithPassword({ email, password });
// 	if (error) throw error;
// 	return user;
// };

// // Logout function
// export const signOut = async () => {
// 	await supabase.auth.signOut();
// };

import { db } from '$lib/mongo';
import { json } from '@sveltejs/kit';
import supabase from './supabase';

export async function POST({ request }) {
	const { email, password, action } = await request.json();
	let response;

	if (action === 'signup') {
		response = await supabase.auth.signUp({ email, password });
		if (response.user) {
			await db.collection('users').insertOne({
				user_id: response.user.id,
				email: response.user.email,
				role: 'author',
				created_at: new Date()
			});
		}
	} else if (action === 'login') {
		response = await supabase.auth.signInWithPassword({ email, password });
	}

	return json(response);
}
