<script>
	import Group from './features/Group.svelte';

	import StyledRect from './atomic/StyledRect.svelte';
	import Canvas from './features/Canvas.svelte';
	import Draggable from './features/Draggable.svelte';

	export let groups = [
		{
			name: 'Fruit basket 1',
			items: [
				{ name: 'Orange', color: 'orange' },
				{ name: 'Pineapple', color: 'yellow' }
			]
		},
		{
			name: 'Fruit basket 2',
			items: [
				{ name: 'Banana', color: 'lightyellow' },
				{ name: 'Apple', color: 'red' }
			]
		}
	];

	export function dragstart(ev, group, item) {
		ev.dataTransfer.setData('group', group);
		ev.dataTransfer.setData('item', item);
	}

	export function dragover(ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	}

	export function drop(ev, new_g) {
		console.log('Drop triggered');
		ev.preventDefault();
		var i = ev.dataTransfer.getData('item');
		var old_g = ev.dataTransfer.getData('group');
		const item = groups[old_g].items.splice(i, 1)[0];
		groups[new_g].items.push(item);
		groups = groups;
	}

	function panDrop(old_grp, item, new_g) {
		console.log('Pan Drop');
	}
</script>

<Canvas>
	{#each groups as group, g}
		<div
			class="group"
			on:drop={(event) => drop(event, g)}
			on:dragover={dragover}
			on:mouseup={(ev) => {
				panDrop(ev, g);
			}}
		>
			<Draggable>
				<Group>
					<b>{group.name}</b>
					{#each group.items as item, i}
						<!-- <div
							class="draggable"
							draggable={true}
							on:dragstart={(event) => dragstart(event, g, i)}
						> -->

						<Draggable grp={g} itm={i} on:panend={(ev) => panDrop()}>
							<StyledRect rectColor={item.color}>{item.name}</StyledRect>
						</Draggable>

						<!-- </div> -->
					{/each}
				</Group>
			</Draggable>
		</div>
	{/each}

	<Draggable>
		<Group>
			<Draggable>
				<StyledRect />
			</Draggable>
		</Group>
	</Draggable>

	<Draggable>
		<StyledRect />
	</Draggable>
</Canvas>

<style>
	.draggable {
		width: fit-content;
	}
	.group {
		/* width: fit-content;
		height: fit-content; */
	}
</style>
