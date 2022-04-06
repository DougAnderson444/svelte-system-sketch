<script context="module">
</script>

<script>
	import { asDraggable } from 'svelte-drag-and-drop-actions';
	import { scale } from './stores.js';

	let DraggableX = 20;
	let DraggableY = 20;
	let DraggableWidth = 80;
	let DraggableHeight = 30;
	let ArenaWidth = 400;
	let ArenaHeight = 400;

	function onDragMove(x, y, dx, dy) {
		DraggableX = DraggableX + dx / $scale.value;
		DraggableY = DraggableY + dy / $scale.value;
	}
	function onDragEnd(x, y, dx, dy) {
		DraggableX = DraggableX; //x / $scale.value;
		DraggableY = DraggableY; //y / $scale.value;
	}
</script>

<div
	style="
  display:block; position:relative;
  width:{ArenaWidth}px; height:{ArenaHeight}px; margin:20px;
  border:dotted 1px black; border-radius:4px;
"
>
	<div
		style="
    display:block; position:absolute;
    left:{DraggableX}px; top:{DraggableY}px; width:{DraggableWidth}px; height:{DraggableHeight}px;
    background:forestgreen; color:white; line-height:30px; text-align:center; cursor:move;
  "
		use:asDraggable={{
			minX: 0,
			minY: 0,
			maxX: ArenaWidth - DraggableWidth,
			maxY: ArenaHeight - DraggableHeight,
			onDragStart: { x: DraggableX, y: DraggableY },
			onDragMove,
			onDragEnd
		}}
	>
		Drag me!
	</div>
</div>
