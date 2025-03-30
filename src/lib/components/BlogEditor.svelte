<!-- <script>
	let formData = {
		title: '',
		coverImage: '',
		content: ''
	};

	function submitHandler() {}
</script>

<section class="mx-auto w-full">
	<form
		on:submit={submitHandler}
		class="flex flex-col items-center justify-center gap-3 bg-pink-200 px-4 shadow-2xs"
	>
		<div class="w-full">
			<p>Title</p>
			<input
				type="text"
				name=""
				id=""
				bind:value={formData.title}
				placeholder="Enter title here.."
				class="w-full border px-2 py-2"
			/>
		</div>
		<div><img src={formData.coverImage} alt="" /></div>
		<div class="w-full">
			<p>Contents</p>
			<textarea
				name=""
				id=""
				bind:value={formData.content}
				class="w-full resize-none border px-2 py-2"
				rows="10"
			></textarea>
		</div>

		<button type="submit">Submit</button>
	</form>
</section> -->

<script>
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';

	let formData = {
		title: '',
		// coverImage: null,
		content: ''
	};
	let previewUrl = ''; // Stores the preview image URL

	// Handle Image Upload to Supabase
	async function uploadImage(file) {
		const fileName = `blog-${Date.now()}-${file.name}`;
		const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file);

		if (error) {
			console.error('Upload Error:', error);
			alert('Image upload failed.');
			return null;
		}

		return supabase.storage.from('blog-images').getPublicUrl(data.path).publicUrl;
	}

	// Handle Image Preview
	function handleImageChange(event) {
		const file = event.target.files[0];
		if (file) {
			formData.coverImage = file;

			// Create a preview URL
			const reader = new FileReader();
			reader.onload = (e) => {
				previewUrl = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}

	// Handle Form Submission
	async function submitHandler(event) {
		event.preventDefault();

		if (!formData.title || !formData.content) {
			alert('Title and Content are required!');
			return;
		}

		let imageUrl = formData.coverImage;

		// Upload image to Supabase Storage
		// if (formData.coverImage && formData.coverImage instanceof File) {
		// 	imageUrl = await uploadImage(formData.coverImage);
		// 	if (!imageUrl) return;
		// }

		// Save blog post to MongoDB via API
		const res = await fetch('/api/blogs', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: formData.title,
				content: formData.content,
				// coverImage: imageUrl
			})
		});

		const data = await res.json();
		if (data.success) {
			alert('Blog created successfully!');
			formData = { title: '',  content: '' };
            // formData = { title: '', coverImage: null, content: '' };
			// previewUrl = ''; // Reset preview
		} else {
			alert('Failed to save blog.');
		}
	}
</script>

<section class="mx-auto w-full">
	<form
		on:submit={submitHandler}
		class="flex flex-col items-center justify-center gap-3 rounded-lg bg-gray-100 px-4 py-6 shadow-md"
	>
		<div class="w-full">
			<label for="title" class="block font-semibold">Title</label>
			<input
				type="text"
				id="title"
				bind:value={formData.title}
				placeholder="Enter title here.."
				class="w-full rounded-lg border px-3 py-2"
			/>
		</div>

		<!-- <div class="w-full">
			<label for="image" class="block font-semibold">Cover Image</label>
			<input
				type="file"
				id="image"
				accept="image/*"
				on:change={handleImageChange}
				class="w-full rounded-lg border px-3 py-2"
			/>
		</div>

		{#if previewUrl}
			<div class="mt-2">
				<img src={previewUrl} alt="Cover Preview" class="h-auto w-40 rounded-md shadow-md" />
			</div>
		{/if} -->

		<div class="w-full">
			<label for="contents" class="block font-semibold">Contents</label>
			<textarea
				id="contents"
				bind:value={formData.content}
				class="w-full resize-none rounded-lg border px-3 py-2"
				rows="10"
			></textarea>
		</div>

		<button type="submit" class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Submit
		</button>
	</form>
</section>
