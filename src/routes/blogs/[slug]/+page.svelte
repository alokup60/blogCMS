<script>
	export let data;
    console.log(data,"data")
</script>

<section class="mx-auto w-full p-4">
	{#if data.blog}
		<h1 class="text-3xl font-bold">{data.blog.title}</h1>
		<p class="text-gray-500">Published on {new Date(data.blog.created_at).toDateString()}</p>

		{#if data.blog.coverImage}
			<img src={data.blog.coverImage} alt="Cover" class="my-4 w-full rounded-md" />
		{/if}

		<p class="mt-4 text-lg">{data.blog.content}</p>
	{:else}
		<p class="text-red-500">Blog not found.</p>
	{/if}
</section>
