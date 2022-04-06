<script>
	import PanHandle from '@douganderson444/svelte-panhandle';

	export let group;
	export let data;

	let target;

	let left = (Math.random() * 500).toFixed(0);
	let top = (Math.random() * 300).toFixed(0);
	let style = `--initial-left: ${left}px; --initial-top: ${top}px;`;
</script>

<div bind:this={target} {style}>
	{group.name} Move me {style}
	<PanHandle {target} bind:style />
	{#if group.hasOwnProperty('items')}{/if}
</div>

<style>
	div {
		position: absolute;
		left: var(--initial-left);
		top: var(--initial-top);
		min-width: 9em;
		min-height: 8em;
		height: fit-content;
		border: 1px dashed grey;
		padding: 1em;
	}
</style>
