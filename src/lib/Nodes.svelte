<script>
	import { onMount } from 'svelte';
	import { groups, draggable, dragndrop } from '$lib/features/directives/draggable';
	import Droppable from './Droppable.svelte';
	import StyledRect from './atomic/StyledRect.svelte';

	import _get from 'lodash-es/get';
	import _remove from 'lodash-es/remove';

	export let name;
	export let nodes;
	export let group;
	export let item;

	const sortByKids = (f, s) => (!!f.children.length < !!s.children.length ? -1 : 1);

	let html = [];
	let mounted;
	onMount(() => {
		mounted = true;
	});
</script>

{#if name}
	<Droppable {name} {group}>
		{#if nodes?.length > 0}
			<h2>{name}</h2>
			Item {item}<br />
			<slot />
			{#each nodes.sort(sortByKids) as node, n}
				<div
					class="draggableGroup"
					draggable={mounted}
					use:draggable={{ group: String(group), item: String(n) }}
				>
					{#if !node?.children?.length}
						<StyledRect rectColor={node.color}>
							<Droppable name={node?.name} group={`${group}[${n}].children`}>
								{group + `[${n}]`} - {node?.name}
							</Droppable>
						</StyledRect>
					{:else}
						<svelte:self
							nodes={node.children}
							name={node.name}
							group={`${group}[${n}].children`}
							item={n}
						>
							{node.name} has {node?.children?.length} children
						</svelte:self>
					{/if}
				</div>
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
	.leaf,
	.draggableGroup {
		width: fit-content;
	}
</style>
