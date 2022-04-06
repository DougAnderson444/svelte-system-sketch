<script>
	import '../app.css';
	import { onMount } from 'svelte';

	onMount(async () => {
		import('svelte-drag-drop-touch');
	});
</script>

<main>
	<slot />
</main>

<style>
	main {
		height: 100%;
	}
</style>
