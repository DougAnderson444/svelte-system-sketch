<script>
	import { onMount } from 'svelte';
	import Nodes from './Nodes.svelte';
	import { groups } from '$lib/features/directives/draggable';

	let rectColor = '#' + (((1 << 24) * Math.random()) | 0).toString(16);

	let canvas;

	onMount(async () => {
		import('svelte-drag-drop-touch');
	});

	$groups = [
		{
			name: 'First Fruit basket',
			color: 'brown',
			children: [
				{ name: 'Orange', color: 'orange', children: [] },
				{ name: 'Pineapple', color: 'yellow', children: [] }
			]
		},
		{
			name: 'Second Fruit basket',
			color: 'brown',
			children: [
				{ name: 'Banana', color: 'blue', children: [] },
				{
					name: 'Apple',
					color: 'red',
					children: [
						{ name: 'Gala', color: 'red', children: [] },
						{ name: 'Granny', color: 'lightgreen', children: [] }
					]
				}
			]
		},
		{
			name: 'Third Fruit basket',
			color: 'brown',
			children: [
				{ name: 'Banana', color: 'blue', children: [] },
				{
					name: 'EXOTIC Apples',
					color: 'red',
					children: [
						{ name: 'Gala', color: 'red', children: [] },
						{ name: 'Granny', color: 'lightgreen', children: [] }
					]
				}
			]
		}
	];
</script>

{#if $groups}
	<Nodes nodes={$groups} name={'My Awesome Flex Drop Group'} group={''} item={''} />
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
