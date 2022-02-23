<script>
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let group = {};

	let offsetHeight;
	let offsetWidth;
</script>

{#key offsetHeight || offsetWidth}
	<div
		in:scale={{ duration: 400, delay: 0, opacity: 0.5, start: 1.2, easing: elasticOut }}
		class="group"
		bind:offsetHeight
		bind:offsetWidth
	>
		<b>{group?.name}</b>
		<slot />
	</div>
{/key}

<style>
	.group {
		border: 2px dashed grey;
		width: fit-content;
		height: fit-content;
		min-width: fit-content;
		min-height: fit-content;
		padding: 1em;
	}
</style>
