<script>
	import ColorPicker from './ColorPicker.svelte';

	export let node;

	let offsetWidth;
	// let backgroundColor = node?.style?.backgroundColor || '#fee9004b';

	// console.log({ backgroundColor, node });

	// $: if (node && backgroundColor)
	// 	node = {
	// 		...node,
	// 		style: {
	// 			...node.style,
	// 			backgroundColor
	// 		}
	// 	};

	function handleDelete(e) {
		// TODO: tentatively delete it, with an undo snackbar
	}

	function handleConnect(e) {
		// TODO make connection
	}
</script>

<div class="context-menu" style="right: -{offsetWidth * 2.25}px; top: 0;" bind:offsetWidth>
	{#if node && node?.style?.backgroundColor && ColorPicker}
		<!-- <ColorPicker bind:backgroundColor /> -->
		<ColorPicker bind:backgroundColor={node.style.backgroundColor} />
	{/if}
	<span on:click|stopPropagation={handleConnect} class="connect">↪</span>
	<span on:click|stopPropagation={handleDelete}>🗑️</span>
</div>

<style>
	.context-menu {
		display: block;
		position: absolute;
		width: fit-content;
		margin-left: 2em;
		z-index: 99;
	}
	.connect {
		--s: 0.05em;
		display: block;
		font-size: 1.7em;
		transform: rotate(328deg) scale(1, -1);
		text-shadow: calc(var(--s) * -0.5) calc(var(--s) * -1) calc(var(--s) * 1.25) #ccc;
	}

	.context-menu:hover,
	.context-menu:before {
		cursor: pointer;
	}
	span:before {
		/* content: '🗑️'; */
	}
</style>
