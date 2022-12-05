<script>
	import RangeSlider from 'svelte-range-slider-pips';
	import { createNewNode } from './utils';
	import { asDroppable } from 'svelte-drag-and-drop-actions';
	import { safeid } from '$lib/utils';
	import PointerTracker from '@douganderson444/pointer-tracker';
	import { onMount } from 'svelte';

	export let children;
	export let scale = 1;

	let pallette;

	onMount(async () => {
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

	let newContainer = createNewNode();

	function onDropped(event) {
		console.log('dropped', event);
		newContainer = createNewNode();
	}
</script>

<div class="pallette" bind:this={pallette}>
	Scale {scale}
	{#key newContainer}
		<div
			class="yellow"
			use:asDroppable={{
				Extras: { newContainer },
				Operations: 'copy',
				DataToOffer: { 'item/plain': '' },
				onDropped
			}}
		>
			+ Drag Me
		</div>
	{/key}
	<!-- <button on:click={handleAddGridItem}>Add Grid Item</button>
	<button on:click={handleAddMapItem}>Add Map</button>
	<button on:click={handleAddListItem}>Add List</button> -->
</div>

<style>
	.yellow {
		background-color: #fee9004b;
		width: 10em;
		height: auto;
		line-height: 2em;
		cursor: default;
		text-align: center;
		margin: 0.5em;
		padding: 0 0.5em;
	}
	.pallette {
		background: #fafafac7;
		position: fixed;
		/* position: absolute; */
		bottom: 0em;
		box-sizing: border-box;
		width: 99%;
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
