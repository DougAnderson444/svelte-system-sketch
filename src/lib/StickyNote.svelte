<script context="module">
</script>

<script>
	import { asDraggable, asDroppable } from 'svelte-drag-and-drop-actions';
	import { scale } from './stores.js';

	let NoteX = 20,
		NoteY = 20,
		NoteWidth = 200,
		NoteHeight = 120;
	let ArenaWidth = 300,
		ArenaHeight = 300;

	function onDragStart() {
		return { x: NoteX, y: NoteY };
	}
	function onDragMove(x, y, dx, dy) {
		NoteX = NoteX + dx / $scale.value;
		NoteY = NoteY + dy / $scale.value;

		// width Boundaries
		if (NoteX < 0) {
			NoteX = 0;
		}

		if (NoteX + NoteWidth > ArenaWidth) {
			NoteX = ArenaWidth - NoteWidth;
		}

		// Height Boundaries
		if (NoteY < 0) {
			NoteY = 0;
		}

		if (NoteY + NoteHeight > ArenaHeight) {
			NoteY = ArenaHeight - NoteHeight;
		}
	}
	function onDragEnd(x, y, dx, dy) {
		NoteX = NoteX;
		NoteY = NoteY;
	}

	function startResizing() {
		return { x: NoteWidth, y: NoteHeight };
	}
	function resize(x, y, dx, dy) {
		NoteWidth = NoteWidth + dx / $scale.value;
		NoteHeight = NoteHeight + dy / $scale.value;
	}
</script>

<div
	style="
  display:block; position:relative;
  width: {ArenaWidth}px; height: {ArenaHeight}px;
  margin:20px;
  border:dotted 1px black; border-radius:4px;
"
>
	<div
		class="Note"
		style="
    left:{NoteX}px; top:{NoteY}px; width:{NoteWidth}px; height:{NoteHeight}px
  "
	>
		<div
			class="Note-Titlebar"
			use:asDraggable={{
				relativeTo: document.body, // NOT the parent!
				onDragStart,
				onDragMove,
				onDragEnd
			}}
		/>
		<span style="position:relative; left:-5px">Drag from Titlebar only</span>
		<div
			class="Note-ResizeHandle"
			use:asDraggable={{
				onDragStart: startResizing,
				onDragMove: resize,
				onDragEnd: resize
			}}
		/>
	</div>
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

	.Note {
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

	.Note-Titlebar {
		display: block;
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 20px;
		background-color: palegoldenrod;
		cursor: grab;
	}

	.Note-ResizeHandle {
		display: block;
		position: absolute;
		right: 0px;
		bottom: 0px;
		width: 32px;
		height: 32px;
		background-color: transparent;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAiklEQVRYR+WUwQ3AIAwDm3UzUNZtxQ8hhBpIbGhZIKezsVzkJ4z7ZnaXu6oq/wSorVMMwAHqzNvOQQzQAUY/DWIADjBSXmDSd4AO4FnXb3TAozxlB+gAnsxTDMABVpSH7AAdYEX5mR2IVD5lgA4QmfmUAThApvJXO0AHyFS+ZweQyrsG6ADIzNtbD4OSoCHdTWtaAAAAAElFTkSuQmCC');
		cursor: nwse-resize;
	}
</style>
