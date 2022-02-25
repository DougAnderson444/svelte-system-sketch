<script>
	import { groups } from '$lib/features/directives/draggable';

	import _get from 'lodash-es/get';
	import _set from 'lodash-es/set';
	import _remove from 'lodash-es/remove';

	export let name;
	export let group;

	let dropZone;

	export function dragover(ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	}

	export function drop(ev, new_g) {
		if (ev.target !== dropZone) {
			console.log('Wrong zone', { target: ev.target }, { dropZone });
			return;
		}
		ev.preventDefault();
		ev.stopPropagation();
		var i = ev.dataTransfer.getData('item');
		var old_g = ev.dataTransfer.getData('group');

		console.log({ new_g });
		// Move first, then drop element from array
		const item = (old_g ? _get($groups, old_g) : $groups)[i];

		let newSpot = _get($groups, new_g);

		// if the child group doesnt exist, create it
		if (!new_g) $groups.push(item);
		// add to root of group object
		else if (!newSpot) _set($groups, new_g, [item]);
		// create the new group as it didn't exist
		else newSpot.push(item); // exists, add item to new group

		(old_g ? _get($groups, old_g) : $groups)?.splice(i, 1)[0]; // remove from old group

		$groups = $groups;
	}
</script>

{#if name}
	<div
		id={group}
		class="dropZoneDiv"
		draggable={true}
		bind:this={dropZone}
		on:drop={(event) => drop(event, group)}
		on:dragover={dragover}
	>
		<slot />
	</div>
{/if}

<style>
	.dropZoneDiv {
		border: 1px dashed grey;
		padding: 9px;
		margin: 9px;
		font-size: 0.9em;
	}
</style>
