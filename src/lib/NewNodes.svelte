<script>
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	import StyledRect from './atomic/StyledRect.svelte';

	export let nodes;
	export let node;

	function handleDnd(e) {
		nodes = e.detail.children;
	}

	const flipDurationMs = 300;
	const dropTargetStyle = { outline: '#51ff002c solid 2px' };

	function handleDndConsider(e) {
		node.children = e.detail.items;
	}
	function handleDndFinalize(e) {
		node.children = e.detail.items;
		// console.log(e);
		nodes = { ...nodes };
	}

	function transformDraggedElement(draggedEl, data, index) {
		console.log({ draggedEl }, draggedEl.querySelector('.dragWrapper'));
		draggedEl.querySelector('.item').style.boxShadow = '2px 2px 8px rgba(0, 0, 0, 0.1)'; // '5px 10px red'; // .transform = 'rotate(10deg)'; //.boxShadow = '5px 10px red';
		draggedEl.querySelector('.item').style.outline = 'green solid 1px';
	}
</script>

{#if node}
	<b style="color:{node?.color}">{node.name}</b>
	{#if node.hasOwnProperty('children')}
		<section
			use:dndzone={{
				items: node.children,
				dropTargetStyle,
				flipDurationMs,
				transformDraggedElement,
				centreDraggedOnCursor: false
			}}
			on:consider={handleDndConsider}
			on:finalize={handleDndFinalize}
		>
			<!-- WE FILTER THE SHADOW PLACEHOLDER THAT WAS ADDED IN VERSION 0.7.4, filtering this way rather than checking whether 'nodes' have the id became possible in version 0.9.1 -->
			{#each node.children.filter((item) => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item (item.id)}
				<div animate:flip={{ duration: flipDurationMs }} class="_item">
					<div class="dragWrapper item">
						<svelte:self bind:nodes node={item} />
					</div>
				</div>
			{/each}
		</section>
	{:else}
		Item
	{/if}
{/if}

<style>
	section {
		width: auto;
		border: 2px dashed grey;
		border-radius: 5px;
		padding: 0.4em;
		/* this will allow the dragged element to scroll the list */
		overflow-y: auto;
		height: auto;
		/* background-color: rgba(100, 100, 100, 0.1); */
		min-height: 10px;
	}
	div {
		width: 90%;
		padding: 0.3em;
		border: 0px solid blue;
		margin: 0.15em 0;
	}
	.item {
		background-color: rgba(00, 100, 100, 0.1);
	}
	.group-node {
		border: 1px dashed grey;
		padding: 9px;
		margin: 9px;
		font-size: 0.9em;
	}
	.leaf,
	.draggableGroup {
		width: fit-content;
	}
	.dropZoneDiv {
		border: 1px dashed grey;
		padding: 9px;
		margin: 9px;
		font-size: 0.9em;
	}
</style>
