<script lang="ts">
	import PointerTracker from '@douganderson444/pointer-tracker';
	import { onMount } from 'svelte';

	import { scale } from './stores.js';

	export let x;
	export let y;
	export let width;
	export let height;

	export let maxFrameHeight = 2500;
	export let maxFrameWidth = 2500;
	export let minFrameHeight = 40;
	export let minFrameWidth = 40;

	export let arenaWidth;
	export let arenaHeight;

	export let direction;
	export let isDragging = false;

	export let grid;

	const isPointerEvent = (event: any): event is PointerEvent => 'pointerId' in event;

	let handleEl;
	let size = '5em';

	$: handleWidth = handleEl ? handleEl.getClientRects()[0].height : 8;
	$: handleHeight = handleEl ? handleEl.getClientRects()[0].width : 8;

	$: left = handleX(direction, x, width, handleWidth);
	$: top = handleY(direction, y, height, handleHeight);

	onMount(() => {
		// ask the browser what the px size is based on the --size in em

		// Watch for pointers
		const pointerTracker = new PointerTracker(handleEl, {
			start: (pointer, event) => {
				// We only want to track 2 pointers at most

				if (pointerTracker.currentPointers.length === 2) return false;
				event.stopPropagation();
				event.preventDefault();
				return true;
			},
			move: (previousPointers, changedPointers, event) => {
				if (!isPointerEvent(event)) return;
				let dx = event.clientX - previousPointers[0].clientX;
				let dy = event.clientY - previousPointers[0].clientY;
				dragHandle(event.clientX, event.clientY, dx, dy);
			},
			end: (pointer, event, cancelled) => {
				onDragEnd();
			}
		});
	});

	let cursor =
		direction == 'nw' || direction == 'se'
			? 'nwse-resize'
			: direction == 'n' || direction == 's'
			? 'ns-resize'
			: direction == 'ne' || direction == 'sw'
			? 'nesw-resize'
			: 'ew-resize';

	// handle positions
	function handleX(direction, x, width, handleWidth) {
		// extra arguments for reactivity
		switch (direction) {
			case 'nw':
			case 'w':
			case 'sw':
				return x - handleWidth / 2; // x - handleWidth;
			case 'n':
			case 's':
				return x + width / 2;
			case 'ne':
			case 'e':
			case 'se':
				return x + width;
		}
	}

	function handleY(direction, y, height, handleHeight) {
		switch (direction) {
			case 'nw':
			case 'n':
			case 'ne':
				return y - handleHeight / 2;
			case 'e':
			case 'w':
				return y + height / 2 - handleHeight / 2;
			case 'sw':
			case 's':
			case 'se':
				return y + height;
		}
	}

	function dragHandle(_x, _y, dx, dy) {
		switch (direction) {
			case 'nw':
			case 'w':
			case 'sw':
				x = Math.max(
					0,
					x + width - maxFrameWidth,
					Math.min(x + width - minFrameWidth, arenaWidth, x + dx / $scale.value)
				);
				width = width - dx / $scale.value;

				break;
			case 'ne':
			case 'e':
			case 'se':
				width =
					Math.max(
						0,
						x + minFrameWidth,
						Math.min(x + maxFrameWidth, arenaWidth, x + width + dx / $scale.value)
					) - x;
		}

		switch (direction) {
			case 'nw':
			case 'n':
			case 'ne':
				y = Math.max(
					0,
					y + height - maxFrameHeight,
					Math.min(y + height - minFrameHeight, arenaHeight, y + dy / $scale.value)
				);
				height = height - dy / $scale.value;
				break;
			case 'sw':
			case 's':
			case 'se':
				height =
					Math.max(
						0,
						y + minFrameHeight,
						Math.min(y + maxFrameHeight, arenaHeight, y + height + dy / $scale.value)
					) - y;
		}
	}
	function onDragEnd() {
		isDragging = false;
		if (grid) {
			x = Math.floor(x / grid) * grid;
			y = Math.floor(y / grid) * grid;
			width = Math.floor(width / grid) * grid;
			height = Math.floor(height / grid) * grid;
		}
	}
</script>

<div
	data-no-pan
	bind:this={handleEl}
	class="resize-handle {direction}"
	style="--size: {size}; left:{left}px; top:{top}px; cursor: {cursor};"
>
	<div class="resize-handle-decoration {direction}" />
</div>

<style>
	:root {
		--color: rgba(121, 121, 121, 0.5);
	}
	.resize-handle-decoration {
		height: calc(var(--size) / 2);
		width: calc(var(--size) / 2);
	}
	.resize-handle-decoration.nw {
		border-left: 0.25em solid var(--color);
		border-top: 0.25em solid var(--color);
	}
	.resize-handle-decoration.w {
		border-left: 0.25em solid var(--color);
	}
	.resize-handle-decoration.sw {
		border-left: 0.25em solid var(--color);
		border-bottom: 0.25em solid var(--color);
	}
	.resize-handle-decoration.ne {
		border-top: 0.25em solid var(--color);
		border-right: 0.25em solid var(--color);
	}
	.resize-handle-decoration.e {
		border-right: 0.25em solid var(--color);
	}
	.resize-handle-decoration.se {
		border-right: 0.25em solid var(--color);
		border-bottom: 0.25em solid var(--color);
	}
	.resize-handle-decoration.n {
		border-top: 0.25em solid var(--color);
	}
	.resize-handle-decoration.s {
		border-bottom: 0.25em solid var(--color);
	}

	.resize-handle {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: var(--size);
		height: var(--size);
		/* margin: var(--size);
		padding: var(--size); */
		/* border: solid 1px rgba(200, 200, 200, 0.1); */
		border-radius: 50%;
		background: rgb(255, 255, 255, 0.1);
	}
</style>
