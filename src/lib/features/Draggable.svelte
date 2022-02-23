<script>
	import { onMount } from 'svelte';

	export let arena;
	export let groups;
	export let item;
	export let g;
	export let i;

	let Conversion;

	let DragImage;
	$: X = item?.X || 20;
	$: Y = item?.Y || 20;
	let DeltaX, DeltaY;
	const minX = 0,
		maxX = 400 - 80;

	const minY = 0,
		maxY = 400 - 30;

	let PositioningWasDelayed = false; // workaround for problem with "drag" events

	onMount(async () => {
		import('svelte-drag-drop-touch');
		const mod = await import('svelte-coordinate-conversion');
		Conversion = mod.default;
	});

	export function dragstart(ev, group, item) {
		ev.dataTransfer.setData('group', String(group));
		ev.dataTransfer.setData('item', String(item));

		const offsets = { offsetX: ev.offsetX, offsetY: ev.offsetY };

		ev.dataTransfer.setData('offset', JSON.stringify(offsets));

		let targetBox = ev.target.getBoundingClientRect();
		DeltaX = ev.pageX - targetBox.left - window.scrollX;
		DeltaY = ev.pageY - targetBox.top - window.scrollY;
		PositioningWasDelayed = false;

		DragImage = document.createElement('div'); // width/height must be > 0!
		DragImage.setAttribute('style', 'display:block; position:absolute; width:1px; height:1px');
		document.body.appendChild(DragImage);
		ev.dataTransfer.setDragImage(DragImage, 0, 0);
		ev.dataTransfer.effectAllowed = 'move';
	}

	function continueDragging(ev) {
		if (ev.screenX === 0 && ev.screenY === 0 && !PositioningWasDelayed) {
			PositioningWasDelayed = true; // last "drag" event contains wrong coord.s
		} else {
			PositioningWasDelayed = false;

			let localPosition = Conversion.fromDocumentTo(
				'local',
				{ left: ev.pageX - DeltaX, top: ev.pageY - DeltaY },
				arena
			);
			X = Math.max(minX, Math.min(maxX, localPosition.left));
			Y = Math.max(minY, Math.min(maxY, localPosition.top));
			item.X = X;
			item.Y = Y;
			item = item;
		}

		ev.dataTransfer.dropEffect = 'move';
		ev.stopPropagation();
	}

	function finishDragging(ev) {
		document.body.removeChild(DragImage); // works with older browsers as well
		ev.stopPropagation();
	}
</script>

{#if item}
	<div
		class="draggable"
		draggable={true}
		on:dragstart={(event) => dragstart(event, g, i)}
		on:drag={continueDragging}
		on:dragend={finishDragging}
		style="left:{X}px; top:{Y}px; background:{i.color}; "
	>
		{X}, {Y}
		<slot thisItem={item} />
	</div>
{/if}

<style>
	div.draggable {
		display: block;
		position: absolute;
		width: 80px;
		height: 30px;
		color: black;
		line-height: 30px;
		text-align: center;
		cursor: move;
		background: rgba(128, 128, 128, 0.466);
	}
</style>
