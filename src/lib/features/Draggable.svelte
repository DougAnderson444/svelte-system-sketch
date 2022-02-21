<script>
	import { pannable } from './directives/draggable';

	let x = 0,
		y = 0;

	function handlePanStart() {}

	function handlePanMove(event) {
		x = x + event.detail.dx;
		y = y + event.detail.dy;
	}

	function handlePanEnd(event) {}
	function handleDragStart(event) {
		console.log('Started drag');
	}
</script>

<div
	class="draggable"
	draggable="true"
	use:pannable
	on:dragstart={handleDragStart}
	on:panstart|stopPropagation={handlePanStart}
	on:panmove|stopPropagation={handlePanMove}
	on:panend|stopPropagation={handlePanEnd}
	style="left: {x}px; top: {y}px"
>
	<slot />
	x,y: {x},{y}
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
