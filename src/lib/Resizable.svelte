<script>
	import { asDraggable } from 'svelte-drag-and-drop-actions';
	import { scale } from './stores.js';

	/**** Frame and Handle positions ****/
	export let node;

	export let x = node?.x || 150;
	export let y = node?.y || 180;

	export let initialWidth = 100;
	export let initialHeight = 40;

	export let arenaWidth = 400;
	export let arenaHeight = 400;

	export let minFrameWidth = 40;
	export let maxFrameWidth = 250;
	export let minFrameHeight = 20;
	export let maxFrameHeight = 250;

	export let handleWidth = 8;
	export let handleHeight = 8;

	let frameRight = x + initialWidth;
	let frameBottom = y + initialHeight;

	function HandleX(direction, x, frameRight) {
		// extra arguments for reactivity
		switch (direction) {
			case 'nw':
			case 'w':
			case 'sw':
				return x - handleWidth;
			case 'n':
			case 's':
				return Math.round((x + frameRight - handleWidth) / 2);
			case 'ne':
			case 'e':
			case 'se':
				return frameRight;
		}
	}

	function HandleY(direction, y, frameBottom) {
		switch (direction) {
			case 'nw':
			case 'n':
			case 'ne':
				return y - handleHeight;
			case 'e':
			case 'w':
				return Math.round((y + frameBottom - handleHeight) / 2);
			case 'sw':
			case 's':
			case 'se':
				return frameBottom;
		}
	}

	/**** event handling ***/

	function dragFrame(_x, _y, dx, dy) {
		x = x + dx / $scale.value;
		frameRight = frameRight + dx / $scale.value;
		if (x < 0) {
			frameRight -= x;
			x = 0;
		}
		if (frameRight > arenaWidth) {
			x -= frameRight - arenaWidth;
			frameRight = arenaWidth;
		}
		y = y + dy / $scale.value;
		frameBottom = frameBottom + dy / $scale.value;
		if (y < 0) {
			frameBottom -= y;
			y = 0;
		}
		if (frameBottom > arenaHeight) {
			y -= frameBottom - arenaHeight;
			frameBottom = arenaHeight;
		}
	}

	function dragHandle(_x, _y, dx, dy, Extras) {
		switch (Extras) {
			case 'nw':
			case 'w':
			case 'sw':
				x = Math.max(
					0,
					frameRight - maxFrameWidth,
					Math.min(frameRight - minFrameWidth, arenaWidth, x + dx / $scale.value)
				);
				break;
			case 'ne':
			case 'e':
			case 'se':
				frameRight = Math.max(
					0,
					x + minFrameWidth,
					Math.min(x + maxFrameWidth, arenaWidth, frameRight + dx / $scale.value)
				);
		}

		switch (Extras) {
			case 'nw':
			case 'n':
			case 'ne':
				y = Math.max(
					0,
					frameBottom - maxFrameHeight,
					Math.min(frameBottom - minFrameHeight, arenaHeight, y + dy / $scale.value)
				);
				break;
			case 'sw':
			case 's':
			case 'se':
				frameBottom = Math.max(
					0,
					y + minFrameHeight,
					Math.min(y + maxFrameHeight, arenaHeight, frameBottom + dy / $scale.value)
				);
		}
	}
</script>

<p style="line-height:150%">Drag the dotted rectangle or resize it using one of its handles:</p>

<div
	class="arena"
	style="
  display:block; position:relative;
  width: {arenaWidth}px; height: {arenaHeight}px;
  margin:20px;
  border:dotted 1px black; border-radius:4px;
"
>
	<div
		class="SelectionFrame note"
		style="
    left:{x}px; top:{y}px; width:{frameRight - x}px; height:{frameBottom - y}px
  "
		use:asDraggable={{ onDragStart: { x: x, y: y }, onDragMove: dragFrame }}
	/>
	<div
		class="ResizeHandle"
		style="
    left:{HandleX('nw', x, frameRight)}px; top:{HandleY('nw', y, frameBottom)}px; cursor:nwse-resize
  "
		use:asDraggable={{
			Extras: 'nw',
			onDragStart: { x: x, y: y },
			onDragMove: dragHandle
		}}
	/>
	<div
		class="ResizeHandle"
		style="
    left:{HandleX('n', x, frameRight)}px; top:{HandleY('n', y, frameBottom)}px; cursor:ns-resize
  "
		use:asDraggable={{ Extras: 'n', onDragStart: { x: 0, y: y }, onDragMove: dragHandle }}
	/>
	<div
		class="ResizeHandle"
		style="
    left:{HandleX('ne', x, frameRight)}px; top:{HandleY('ne', y, frameBottom)}px; cursor:nesw-resize
  "
		use:asDraggable={{
			Extras: 'ne',
			onDragStart: { x: frameRight, y: y },
			onDragMove: dragHandle
		}}
	/>
	<div
		class="ResizeHandle"
		style="
    left:{HandleX('e', x, frameRight)}px; top:{HandleY('e', y, frameBottom)}px; cursor:ew-resize
  "
		use:asDraggable={{ Extras: 'e', onDragStart: { x: frameRight, y: 0 }, onDragMove: dragHandle }}
	/>
	<div
		class="ResizeHandle"
		style="
    left:{HandleX('se', x, frameRight)}px; top:{HandleY('se', y, frameBottom)}px; cursor:nwse-resize
  "
		use:asDraggable={{
			Extras: 'se',
			onDragStart: { x: frameRight, y: frameBottom },
			onDragMove: dragHandle
		}}
	/>
	<div
		class="ResizeHandle"
		style="
    left:{HandleX('s', x, frameRight)}px; top:{HandleY('s', y, frameBottom)}px; cursor:ns-resize
  "
		use:asDraggable={{ Extras: 's', onDragStart: { x: 0, y: frameBottom }, onDragMove: dragHandle }}
	/>
	<div
		class="ResizeHandle"
		style="
    left:{HandleX('sw', x, frameRight)}px; top:{HandleY('sw', y, frameBottom)}px; cursor:nesw-resize
  "
		use:asDraggable={{
			Extras: 'sw',
			onDragStart: { x: x, y: frameBottom },
			onDragMove: dragHandle
		}}
	/>
	<div
		class="ResizeHandle"
		style="
    left:{HandleX('w', x, frameRight)}px; top:{HandleY('w', y, frameBottom)}px; cursor:ew-resize
  "
		use:asDraggable={{ Extras: 'w', onDragStart: { x: x, y: 0 }, onDragMove: dragHandle }}
	/>
	<slot />
</div>

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

	.SelectionFrame {
		display: block;
		position: absolute;
		border: dotted 1px black;
		cursor: move;
	}

	.ResizeHandle {
		display: block;
		position: absolute;
		width: 8px;
		height: 8px;
		border: solid 1px black;
		background: dodgerblue;
	}

	.note {
		display: block;
		position: absolute;
		padding: 40px 0px 0px 0px;
		border: solid 1px lightgray;
		background-color: lightyellow;
		text-align: center;
		color: black;

		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
</style>
