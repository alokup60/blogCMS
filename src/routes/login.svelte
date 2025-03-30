<script>
	import supabase from '$lib/supabase';

	let email = '',
		password = '';
	async function login() {
		const { user, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) alert(error.message);
		else alert('Login successful!');
	}
</script>

<input bind:value={email} placeholder="Email" />
<input type="password" bind:value={password} placeholder="Password" />
<button on:click={login}>Login</button>
