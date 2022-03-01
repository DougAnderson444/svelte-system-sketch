<script>
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	// import StyledRect from './atomic/StyledRect.svelte';

	export let nodes;
	export let node;
	export let wrapper;

	function handleDnd(e) {
		nodes = e.detail.children;
	}

	const flipDurationMs = 400;
	const dropTargetStyle = { outline: '#51ff002c solid 2px' };

	function handleDndConsider(e) {
		node.children = e.detail.items;
		console.log({ info: e.detail.info });
	}
	function handleDndFinalize(e) {
		node.children = e.detail.items;
		// console.log(e);
		nodes = { ...nodes };
	}

	function transformDraggedElement(draggedEl, data, index) {
		draggedEl.querySelector('.dragWrapper').style.boxShadow = '2px 2px 8px rgba(0, 0, 0, 0.8)'; // '5px 10px red'; // .transform = 'rotate(10deg)'; //.boxShadow = '5px 10px red';
		draggedEl.querySelector('.dragWrapper').style.outline = 'green solid 1px';
	}
</script>

{#if node && wrapper}
	<svelte:component this={wrapper}>
		<div slot="header">
			<b style="color:{node?.color}">{node.name}</b>
		</div>
		<div slot="children">
			{#if node.hasOwnProperty('children')}
				<section
					class="dragndropSection item"
					use:dndzone={{
						items: node.children,
						dropTargetStyle,
						flipDurationMs,
						transformDraggedElement,
						centreDraggedOnCursor: true
					}}
					on:consider={handleDndConsider}
					on:finalize={handleDndFinalize}
				>
					<!-- WE FILTER THE SHADOW PLACEHOLDER THAT WAS ADDED IN VERSION 0.7.4, filtering this way rather than checking whether 'nodes' have the id became possible in version 0.9.1 -->
					{#each node.children.filter((item) => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item (item.id)}
						<div animate:flip={{ duration: flipDurationMs }} class="_item">
							<div class="dragWrapper">
								<svelte:self bind:nodes node={item} {wrapper} />
							</div>
						</div>
					{/each}
				</section>
			{:else}
				Item
			{/if}
		</div>
	</svelte:component>
{/if}

<style>
	section.dragndropSection {
		width: auto;
		border: 1px dashed rgba(128, 128, 128, 0.486);
		border-radius: 5px;
		padding: 0.4em;
		/* this will allow the dragged element to scroll the list */
		overflow-y: auto;
		height: auto;
		/* background-color: rgba(100, 100, 100, 0.1); */
		min-height: 10px;
	}
	div {
		/* width: 90%;
		padding: 0.05em;
		margin: 0.05em 0; */
	}
	.item {
		background-color: rgba(00, 100, 100, 0.025);
	}
</style>
