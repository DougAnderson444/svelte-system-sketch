<script>
	import { onMount } from 'svelte';
	import Nodes from './Nodes.svelte';
	import NewNodes from './NewNodes.svelte';
	import { nanoid } from 'nanoid';
	import Wrapper from './atomic/Basic.svelte';
	import GridControls from './GridControls.svelte';

	let rectColor = '#' + (((1 << 24) * Math.random()) | 0).toString(16);

	let canvas;
	let mounted;
	onMount(async () => {
		import('svelte-drag-drop-touch');
		mounted = true;
	});

	let groups = {
		id: nanoid(),
		name: 'Root',
		color: 'red',
		children: [
			{
				id: nanoid(),
				name: 'First Fruit basket',
				color: 'brown',
				children: [
					{ id: nanoid(), name: 'Orange', color: 'orange' },
					{ id: nanoid(), name: 'Pineapple', color: 'yellow', children: [] }
				]
			},
			{
				id: nanoid(),
				name: 'Second Fruit basket',
				color: 'brown',
				children: [
					{ id: nanoid(), name: 'Banana', color: 'blue', children: [] },
					{
						id: nanoid(),
						name: 'Apple',
						color: 'red',
						children: [
							{ id: nanoid(), name: 'Gala', color: 'red', children: [] },
							{ id: nanoid(), name: 'Granny', color: 'lightgreen', children: [] }
						]
					}
				]
			},
			{
				id: nanoid(),
				name: 'Third Fruit basket',
				color: 'brown',
				children: [
					{ id: nanoid(), name: 'Banana', color: 'blue', children: [] },
					{
						id: nanoid(),
						name: 'EXOTIC Apples',
						color: 'red',
						children: [
							{ id: nanoid(), name: 'Gala', color: 'red', children: [] },
							{ id: nanoid(), name: 'Granny', color: 'lightgreen', children: [] }
						]
					}
				]
			}
		]
	};
	let layoutNodes = {
		id: nanoid(),
		name: 'Root',
		color: 'red',
		children: [
			{ id: nanoid(), name: 'Left', color: 'grey' },
			{ id: nanoid(), name: 'TopRight', color: 'grey' },
			{ id: nanoid(), name: 'BottomRight', color: 'grey' }
		]
	};
</script>

{#if mounted && groups}
	<NewNodes bind:nodes={groups} node={groups} wrapper={Wrapper} />
	<!-- <Nodes nodes={$groups} name={'My Awesome Flex Drop Group'} group={''} item={''} /> -->
{/if}

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
