<script>
	import { groups, draggable } from '$lib/features/directives/draggable';

	import _get from 'lodash-es/get';
	import _remove from 'lodash-es/remove';

	export let name;
	export let nodes;
	export let group;
	export let item;

	let html = [];
	let dropZone;

	export function dragover(ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	}

	export function drop(ev, new_g) {
		if (ev.target !== dropZone) return;
		ev.preventDefault();
		ev.stopPropagation();
		var i = ev.dataTransfer.getData('item');
		var old_g = ev.dataTransfer.getData('group');

		console.log(`Dropping from ${old_g} [${i}]  to ${new_g}`);
		// Move first, then drop element from array
		// const item = (old_g ? _get($groups, old_g) : $groups)?.splice(i, 1)[0];
		const item = (old_g ? _get($groups, old_g) : $groups)[i];
		console.log({ item }); // get the item from the group + item index

		(new_g ? _get($groups, new_g) : $groups)?.push(item); // add item to new group
		(old_g ? _get($groups, old_g) : $groups)?.splice(i, 1)[0]; // remove from old group

		$groups = $groups;
	}
</script>

{#if name}
	<div
		id={group}
		class="group-node"
		draggable={true}
		bind:this={dropZone}
		on:drop={(event) => drop(event, group)}
		on:dragover={dragover}
	>
		{#if nodes?.length > 0}
			<h2>{name}</h2>
			Item {item}<br />
			<slot />
			{#each nodes as node, n}
				{#if !node?.children?.length}
					<div
						class="leaf"
						draggable={true}
						use:draggable={{ group: String(group), item: String(n) }}
					>
						{group} + {`[${n}]`} - {node.name}
					</div>
				{/if}
			{/each}
			{#each nodes as node, n}
				{#if node?.children?.length}
					<svelte:self
						nodes={node.children}
						name={node.name}
						group={`${group}[${n}].children`}
						item={n}
					>
						{node.name} has {node?.children?.length} children
					</svelte:self>
				{/if}
			{/each}
		{/if}
	</div>
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
