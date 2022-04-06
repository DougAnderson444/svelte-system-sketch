<script>
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { children } from 'svelte/internal';
	import Container from './Container.svelte';
	import Gripper from './Gripper.svelte';
	import Nodes from './Nodes.svelte';

	export let wrapper;
	export let props;
	export let data;

	const flipDurationMs = 300;
	let dragDisabled = true;

	function handleConsider(e) {
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		props.items = newItems;
		// Ensure dragging is stopped on drag finish via keyboard
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
	}
	function handleFinalize(e) {
		const {
			items: newItems,
			info: { source }
		} = e.detail;
		props.items = newItems;
		// Ensure dragging is stopped on drag finish via pointer (mouse, touch)
		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}
	}
	function startDrag(e) {
		console.log('dragstart');
		// preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
		e.preventDefault();
		e.stopPropagation();
		dragDisabled = false;
	}
	function handleKeyDown(e) {
		if ((e.key === 'Enter' || e.key === ' ') && dragDisabled) dragDisabled = false;
	}
</script>

<section
	class="node-section"
	use:dndzone={{
		items: props.items,
		dragDisabled,
		flipDurationMs,
		centreDraggedOnCursor: true
	}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	<!-- WE FILTER THE SHADOW PLACEHOLDER THAT WAS ADDED IN VERSION 0.7.4, filtering this way rather than checking whether 'nodes' have the id became possible in version 0.9.1 -->
	{#each props.items.filter((item) => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="item">
			<div
				tabindex={dragDisabled ? 0 : -1}
				aria-label="drag-handle"
				class="handle"
				style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
				on:mousedown={startDrag}
				on:touchstart={startDrag}
				on:keydown={handleKeyDown}
			>
				<Gripper />
			</div>
			<span>{item.name}</span>
			{#if item.children}
				<Container bind:data node={item.children} />
			{/if}
		</div>
	{/each}
</section>

<style>
	section.node-section {
		width: auto;
		border: 1px dashed rgba(128, 128, 128, 0.486);
		border-radius: 5px;
		padding: 0.4em;
		/* this will allow the dragged element to scroll the list */
		overflow: hidden;
		height: auto;
		/* background-color: rgba(100, 100, 100, 0.1); */
		min-height: 6em;
	}

	div.item {
		position: relative;
		/* height: 1.5em; */
		width: 90%;
		text-align: center;
		margin: 1em;
		line-height: 1.5;
		background-color: rgba(100, 100, 100, 0.1);
	}
	.handle {
		position: absolute;
		left: 2px;
		top: 2px;
		margin: 0.1em;
		padding: 0.1em;
		z-index: 100;
		/* gripper needs to be outside or on top of div  */
		width: 1em;
		height: 1em;
	}
</style>
