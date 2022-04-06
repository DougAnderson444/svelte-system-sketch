<script>
	import ColorPicker from './ColorPicker.svelte';

	export let node;

	let backgroundColor = node?.style?.backgroundColor || '#fee9004b';

	console.log({ backgroundColor });

	$: if (backgroundColor)
		node = {
			...node,
			style: {
				...node.style,
				backgroundColor
			}
		};

	function handleDelete(e) {
		// TODO: tentatively delete it, with an undo snackbar
	}

	function handleConnect(e) {
		// TODO make connection
	}
</script>

<div style="left: {node.x + node.style.width}px; top: {node.y}px;">
	<ColorPicker bind:backgroundColor />
	<span on:click|stopPropagation={handleConnect} class="connect">↪</span>
	<span on:click|stopPropagation={handleDelete}>🗑️</span>
</div>

<style>
	.connect {
		--s: 0.05em;
		display: block;
		font-size: 1.7em;
		transform: rotate(328deg) scale(1, -1);
		text-shadow: calc(var(--s) * -0.5) calc(var(--s) * -1) calc(var(--s) * 1.25) #ccc;
	}

	span:hover,
	div:before {
		cursor: pointer;
	}
	div {
		position: absolute;
		width: fit-content;
		margin-left: 2em;
		z-index: 99;
	}
	span:before {
		/* content: '🗑️'; */
	}
</style>
