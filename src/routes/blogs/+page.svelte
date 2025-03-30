<script>
	import { onMount } from 'svelte';

	let blogs = [];
	let loading = true;
	let error = null;

	async function fetchBlogs() {
		try {
			const res = await fetch('/api/get-blogs'); // Calls the GET API
			if (!res.ok) throw new Error('Failed to fetch blogs');
			blogs = await res.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	// Fetch blogs when the component mounts
	onMount(fetchBlogs);
</script>

<div>
	<h1 class="text-2xl font-bold">Latest Blogs</h1>

	{#if loading}
		<p>Loading...</p>
	{:else if error}
		<p class="text-red-500">{error}</p>
	{:else if blogs.length === 0}
		<p>No blogs found.</p>
	{:else}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each blogs as blog}
				<div class="border p-4 shadow">
					<h2 class="text-xl font-semibold">{blog.title}</h2>
					<p class="text-gray-600">{blog.content.slice(0, 100)}...</p>
					<a href={`/blogs/${blog.slug}`} class="text-blue-500">Read More</a>
				</div>
			{/each}
		</div>
	{/if}
</div>
