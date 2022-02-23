<script>
	import { onMount } from 'svelte';
	import Group from './features/Group.svelte';

	import StyledRect from './atomic/StyledRect.svelte';
	import Canvas from './features/Canvas.svelte';
	import Pannable from './features/Pannable.svelte';
	import Draggable from './features/Draggable.svelte';
	import Droppable from './features/Droppable.svelte';

	onMount(() => {
		import('svelte-drag-drop-touch');
	});

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
				{ name: 'Banana', color: 'blue' },
				{ name: 'Apple', color: 'red' }
			]
		}
	];
</script>

{#each groups as group, g}
	<b>{group.name}</b>
	<ul>
		{#each group.items as item, i}
			<li>{item.name} {item.X},{item.Y}</li>
		{/each}
	</ul>
{/each}

<Canvas>
	{#each groups as group, g}
		<Droppable bind:groups {g}>
			<Group {group} let:arena>
				{#each group.items as item, i}
					<Draggable {groups} bind:item {g} {i} {arena} let:thisItem>
						<StyledRect rectColor={thisItem.color}
							>{thisItem.name}
							<div slot="footer">
								Group {g}<br />
								<span>Item {i}</span>
							</div>
						</StyledRect>
					</Draggable>
				{/each}
			</Group>
		</Droppable>
	{/each}
</Canvas>

<style>
	:global([draggable]) {
		-webkit-touch-callout: none;
		-ms-touch-action: none;
		touch-action: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.draggable {
		width: fit-content;
	}
	.group {
		/* width: fit-content;
		height: fit-content; */
	}
</style>
