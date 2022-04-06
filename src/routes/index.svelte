<script>
	import { onMount } from 'svelte';
	import App from '$lib/App.svelte';

	let mounted;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<App />
{/if}
