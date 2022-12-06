<script>
	import { onMount } from 'svelte';
	import Sketch from '$lib/Sketch.svelte';
	import { safeid } from '$lib/utils';
	import { colors } from '$lib/config';

	let width;
	let height;
	let mounted;

	let rectColor = () => '#' + (((1 << 24) * Math.random()) | 0).toString(16);

	function randomColor() {
		return Math.floor((Math.random() * 10) % colors.length);
	}

	let data = {
		name: 'My Dashboard of Lists',
		id: safeid(),
		x: 20,
		y: 20,
		style: {
			backgroundColor: colors[randomColor()],
			width: 600,
			left: 20,
			top: 20,
			height: 800
		},
		children: [
			{
				name: 'Child 1',
				id: safeid(),
				x: 60,
				y: 80,
				style: {
					backgroundColor: colors[randomColor()],
					width: 220,
					height: 520,
					left: 20,
					top: 20
				},
				// component: DragHandles,
				props: [],
				children: []
			},
			{
				name: 'Child 2',
				id: safeid(),
				x: 300,
				y: 80,
				style: {
					backgroundColor: colors[randomColor()],
					width: 100,
					height: 140,
					left: 20,
					top: 20
				},
				// component: DragHandles,
				props: [],
				children: []
			},
			{
				name: 'Child 3',
				id: safeid(),
				x: 420,
				y: 80,
				style: {
					backgroundColor: colors[randomColor()],
					width: 100,
					height: 160,
					left: 20,
					top: 20
				},

				// component: DragHandles,
				props: [],
				children: []
			}
		]
	};

	let vh;

	onMount(() => {
		handleViewportSize();
	});

	function handleViewportSize(_) {
		vh = window.innerHeight * 0.01;
		height = window.innerHeight;
		width = document?.body.clientWidth; // excludes scrollbar
	}
</script>

<svelte:window on:resize={handleViewportSize} />

<div class="app" style="--vh: {vh}px; height: calc(var(--vh, 1vh) * 100);">
	{#if vh}
		<Sketch bind:data {width} {height} />
	{/if}
</div>

<style>
	.app {
		height: 100vh; /* Fallback for browsers that do not support Custom Properties */
	}
</style>
