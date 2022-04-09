<script>
	/**
	 * Svelte DND Action draggable handle example
	 */

	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	import Gripper from './Gripper.svelte';

	export let data;
	export let node;
	export let wrapper;

	const flipDurationMs = 300;
	let dragDisabled = true;

	function handleConsider(e) {
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		node.children = newItems;
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
		node.children = newItems;
		// Ensure dragging is stopped on drag finish via pointer (mouse, touch)
		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}
	}
	function startDrag(e) {
		// preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
		e.preventDefault();
		dragDisabled = false;
	}
	function handleKeyDown(e) {
		if ((e.key === 'Enter' || e.key === ' ') && dragDisabled) dragDisabled = false;
	}
</script>

{#if node}
	<b style="color:{node?.color}">{node.name}</b>
	{#if node.hasOwnProperty('children')}
		<section
			class="node-section"
			use:dndzone={{
				items: node.children,
				dragDisabled,
				flipDurationMs,
				centreDraggedOnCursor: true
			}}
			on:consider={handleConsider}
			on:finalize={handleFinalize}
		>
			<!-- WE FILTER THE SHADOW PLACEHOLDER THAT WAS ADDED IN VERSION 0.7.4, filtering this way rather than checking whether 'nodes' have the id became possible in version 0.9.1 -->
			{#each node.children.filter((item) => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item (item.id)}
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
					<!-- <span>{item.name}</span> -->
					<svelte:self bind:data node={item} {wrapper} />
				</div>
			{/each}
		</section>
	{/if}
{/if}

<style>
	section.node-section {
		width: auto;
		border: 1px dashed rgba(128, 128, 128, 0.486);
		border-radius: 5px;
		padding: 0.4em;
		/* this will allow the dragged element to scroll the list */
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
