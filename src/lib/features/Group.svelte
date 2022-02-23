<script>
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let group = {};

	let offsetHeight;
	let offsetWidth;
	let arena;
</script>

{#key offsetHeight || offsetWidth}
	<div
		in:scale={{ duration: 400, delay: 0, opacity: 0.5, start: 1.2, easing: elasticOut }}
		class="group"
		bind:offsetHeight
		bind:offsetWidth
		bind:this={arena}
	>
		<b>{group?.name}</b><br />
		{arena?.offsetWidth} x {arena?.offsetHeight} (incl padding + border)<br />
		{arena?.clientWidth} x {arena?.clientHeight} (excludes padding + border)
		<slot {arena} />
	</div>
{/key}

<style>
	.group {
		border: 2px dashed grey;
		width: 250px;
		height: 250px;
		min-width: fit-content;
		min-height: fit-content;
		padding: 10px;
	}
</style>
