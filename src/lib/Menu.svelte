<script>
	import RangeSlider from 'svelte-range-slider-pips';
	import { createNewNode } from './utils';
	import { safeid } from '$lib/utils';
	import PointerTracker from '@douganderson444/pointer-tracker';
	import { onMount } from 'svelte';
	import Container from './Container.svelte';

	export let children;
	export let scale = 1;
	export let arenaHeight;
	export let arenaWidth;

	let pallette;
	let newContainer;

	onMount(async () => {
		createNode();
		// Watch for pointers
		const pointerTracker = new PointerTracker(pallette, {
			start: (pointer, event) => {
				// event.stopPropagation();
				// event.preventDefault();
				return false;
			}
		});
	});

	function handleAddNode(event) {
		const newNode = createNewNode();
		children.push(newNode);
		children = children;
	}

	function createNode() {
		newContainer = createNewNode({
			name: '+ Drag Me',
			style: {
				backgroundColor: '#fee9004b',
				width: 200,
				height: 60
			}
		});
	}

	function onDropped(event) {
		createNode();
	}
</script>

<div class="pallette" bind:this={pallette} data-menu>
	Scale {scale}
	{#if arenaWidth && arenaHeight}
		{#key newContainer}
			<Container node={newContainer} on:drop={onDropped} {arenaWidth} {arenaHeight} />
		{/key}
	{/if}
	<!-- <button on:click={handleAddGridItem}>Add Grid Item</button>
	<button on:click={handleAddMapItem}>Add Map</button>
	<button on:click={handleAddListItem}>Add List</button> -->
</div>

<style>
	.pallette {
		width: 100%;
		height: 5em;
		line-height: 2em;
		cursor: default;
		text-align: center;
		padding: 0 0.5em;
		background: #d9d9d9c7;
		/* position: fixed; */
		position: absolute;
		top: 0em;
		box-sizing: border-box;
		z-index: 999;
	}

	/* #reverse-pips .rangePips {
		bottom: auto;
		top: -1em;
	}
	#reverse-pips .pip {
		background: rgb(198, 187, 224);
		top: auto;
		bottom: 0.25em;
		width: 2px;
		transform: translateX(-1px);
		transition-duration: 0.5s;
		opacity: 0.7;
	}
	#reverse-pips .pip:nth-child(5n + 1) {
		height: 0.8em;
		opacity: 0.9;
	}
	#reverse-pips .pip:nth-child(5n),
	#reverse-pips .pip:nth-child(5n + 2) {
		height: 0.65em;
	}
	#reverse-pips .pip.selected {
		background: rgb(255, 0, 157);
		transition-duration: 0.05s;
		opacity: 1;
	} */

	:global(#reverse-pips .rangePips) {
		bottom: auto;
		top: -1em;
	}
	:global(#reverse-pips .pip) {
		background: rgb(198, 187, 224);
		top: auto;
		bottom: 0.25em;
		width: 2px;
		transform: translateX(-1px);
		transition-duration: 0.5s;
		opacity: 0.7;
	}
	:global(#reverse-pips .pip:nth-child(5n + 1)) {
		height: 0.8em;
		opacity: 0.9;
	}

	:global(#reverse-pips .pip:nth-child(5n), #reverse-pips .pip:nth-child(5n + 2)) {
		height: 0.65em;
	}

	:global(#reverse-pips .pip.selected) {
		background: #0bb113;
		transition-duration: 0.05s;
		opacity: 1;
	}
</style>
