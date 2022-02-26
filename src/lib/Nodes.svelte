<script>
	import { groups, draggable } from '$lib/features/directives/draggable';
	import Droppable from './Droppable.svelte';

	import _get from 'lodash-es/get';
	import _remove from 'lodash-es/remove';

	export let name;
	export let nodes;
	export let group;
	export let item;

	let html = [];
</script>

{#if name}
	<Droppable {name} {group}>
		{#if nodes?.length > 0}
			<h2>{name}</h2>
			Item {item}<br />
			<slot />
			{#each nodes as node, n}
				{#if !node?.children?.length}
					<div
						class="_leaf"
						draggable={true}
						use:draggable={{ group: String(group), item: String(n) }}
					>
						<Droppable name={node?.name} group={group + `[${n}].children`}>
							{group} + {`[${n}]`} - {node?.name}
						</Droppable>
					</div>
				{:else}
					<div
						class="draggableGroup"
						draggable={true}
						use:draggable={{ group: String(group), item: String(n) }}
					>
						<svelte:self
							nodes={node.children}
							name={node.name}
							group={`${group}[${n}].children`}
							item={n}
						>
							{node.name} has {node?.children?.length} children
						</svelte:self>
					</div>
				{/if}
			{/each}
		{/if}
	</Droppable>
{/if}

<style>
	.group-node {
		border: 1px dashed grey;
		padding: 9px;
		margin: 9px;
		font-size: 0.9em;
	}
	.leaf {
		border: 3px dashed darkgrey;
		padding: 25px;
		margin: 15px;
	}
</style>
