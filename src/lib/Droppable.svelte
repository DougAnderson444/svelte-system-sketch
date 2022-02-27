<script>
	import { groups } from '$lib/features/directives/draggable';

	import _ from 'lodash-es';

	export let name;
	export let group;

	let dropZone;
	let sortByKids = (f, s) => (!!f.children.length < !!s.children.length ? -1 : 1);

	export function dragover(ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	}

	export function drop(ev, new_g) {
		ev.preventDefault();
		ev.stopPropagation();
		const old_g = ev.dataTransfer.getData('group');
		const i = ev.dataTransfer.getData('item');

		let newGrp = _.get($groups, new_g);

		// new group cannot be a child of the old group! cannot move to inside yourself
		if (old_g + `[${i}]` + '.children' == new_g) {
			console.log("Can't move to a child of the current existing group");
			return;
		}

		// if the child group doesnt exist, create it
		if (!new_g) {
			// add to root of group object
			let old_item = (old_g ? _.get($groups, old_g) : $groups)?.splice(i, 1)[0];
			$groups = [...$groups, old_item].sort(sortByKids);
		} else if (!newGrp) {
			_.set($groups, new_g, [(old_g ? _.get($groups, old_g) : $groups)?.splice(i, 1)[0]]).sort(
				sortByKids
			);
			// create the new group as it didn't exist
		} else {
			_.get($groups, new_g).push((old_g ? _.get($groups, old_g) : $groups)?.splice(i, 1)[0]);
			_.get($groups, new_g)?.sort(sortByKids);
		}

		(old_g ? _.get($groups, old_g) : $groups)?.sort(sortByKids); // also sort the old group

		// sort by if the groups have children or not
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
