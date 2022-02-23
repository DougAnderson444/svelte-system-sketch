<script>
	export let groups;
	export let g;

	let dropZone;

	export function dragover(ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	}
	export function drop(ev, new_g) {
		ev.preventDefault();
		var i = ev.dataTransfer.getData('item');
		var old_g = ev.dataTransfer.getData('group');
		const shifts = JSON.parse(ev.dataTransfer.getData('shifts'));

		if (new_g == old_g) return; // skip if string != integer of group change (or lack thereof)

		const item = groups[old_g].items.splice(i, 1)[0];

		console.log('dropZone event', { ev });
		item.X = ev.layerX - shifts.shiftX;
		item.Y = ev.layerY - shifts.shiftY;

		groups[new_g].items.push(item);
		groups = groups;
	}
</script>

<div
	class="droppable"
	bind:this={dropZone}
	on:drop={(event) => drop(event, g)}
	on:dragover={dragover}
>
	<slot />
</div>

<style>
	div.droppable {
		width: fit-content;
		height: fit-content;
	}
</style>
