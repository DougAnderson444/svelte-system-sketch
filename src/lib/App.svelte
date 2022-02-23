<script>
<<<<<<< HEAD
	// https://svelte.dev/repl/e1c6ee3a5b10464585d86cec61cccab4?version=3.46.4
=======
>>>>>>> feat--pan-drop
	import { onMount } from 'svelte';
	import Group from './features/Group.svelte';

	import StyledRect from './atomic/StyledRect.svelte';
	import Canvas from './features/Canvas.svelte';
	import Pannable from './features/Pannable.svelte';
	import Draggable from './features/Draggable.svelte';
	import Droppable from './features/Droppable.svelte';

	let Arena;
	let PositioningWasDelayed = false; // workaround for problem with "drag" events

	onMount(() => {
		import('svelte-drag-drop-touch');
	});

	let Arena;
	let PositioningWasDelayed = false; // workaround for problem with "drag" events

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
</script>

<Canvas>
	{#each groups as group, g}
		<Droppable bind:groups {g}>
			<Group {group}>
				{#each group.items as item, i}
					<Draggable {groups} {g} {i}>
						<StyledRect rectColor={item.color}>{item.name}</StyledRect>
					</Draggable>
				{/each}
			</Group>
		</Droppable>
	{/each}

	<Pannable>
		<Group>
			<Pannable>
				<StyledRect />
			</Pannable>
		</Group>
	</Pannable>

	<Pannable>
		<StyledRect />
	</Pannable>
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
