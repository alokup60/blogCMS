import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Configure preprocess to disable CSS source maps
	preprocess: vitePreprocess({
		sourceMap: false // Disable source map generation for CSS
	}),

	kit: {
		// Adapter auto to adapt for your environment
		adapter: adapter()
	}
};

export default config;
