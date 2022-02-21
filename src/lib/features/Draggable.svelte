<script>
	import { pannable } from './directives/draggable';
	import { createEventDispatcher } from 'svelte';

	export let grp;
	export let itm;

	const dispatch = createEventDispatcher();

	let x = 0,
		y = 0;

	function handlePanStart(event) {
		console.log({ event });
		// set this group and item
		event.dataTransfer.setData('group', g);
		event.dataTransfer.setData('item', i);
		dispatch('panstart', { g, i });
	}

	function handlePanMove(event) {
		x = x + event.detail.dx;
		y = y + event.detail.dy;
	}

	function handlePanEnd(event) {
		dispatch('panend', event);
	}
</script>

<div
	class="draggable"
	use:pannable={{ grp, itm }}
	on:panstart|stopPropagation={handlePanStart}
	on:panmove|stopPropagation={handlePanMove}
	on:panend|stopPropagation={handlePanEnd}
	on:panend
	style="left: {x}px; top: {y}px"
>
	<slot />
	x,y: {x},{y}<br />
	g,i: {g},{i}
</div>

<style>
	.draggable {
		cursor: move;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: fit-content;
		flex-wrap: nowrap;
		align-content: flex-start;
	}
</style>
