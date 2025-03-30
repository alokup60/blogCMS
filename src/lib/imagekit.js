import { PUBLIC_IMAGEKIT_URL } from '$env/static/public'; // Use public env variables

export function getOptimizedImageUrl(imagePath) {
	if (!PUBLIC_IMAGEKIT_URL) {
		console.error('ImageKit URL is not defined in environment variables.');
		return imagePath; // Return original path if PUBLIC_IMAGEKIT_URL is missing
	}
	return `${PUBLIC_IMAGEKIT_URL}/${imagePath.replace(/^\//, '')}`; // Ensure no double slashes
}
