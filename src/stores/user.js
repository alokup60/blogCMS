// src/stores/user.js
import { writable } from 'svelte/store';
import supabase from '$lib/supabase';

// Create a writable store for the user
export let user = writable(null);

// Set up listener for authentication changes
supabase.auth.onAuthStateChange((event, session) => {
  user.set(session?.user || null); // Update the user store on login/logout
});
