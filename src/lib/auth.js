// src/lib/auth.js
import supabase from './supabase';

// Sign-up function
export const signUp = async (email, password) => {
	const { user, error } = await supabase.auth.signUp({ email, password });
	if (error) throw error;
	return user;
};

// Login function
export const signIn = async (email, password) => {
	const { user, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) throw error;
	return user;
};

// Logout function
export const signOut = async () => {
	await supabase.auth.signOut();
};
