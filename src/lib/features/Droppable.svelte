<script>
	export let groups;
	export let g;

	export function dragover(ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	}
	export function drop(ev, new_g) {
		ev.preventDefault();
		var i = ev.dataTransfer.getData('item');
		var old_g = ev.dataTransfer.getData('group');
		const offsets = JSON.parse(ev.dataTransfer.getData('offset'));
		console.log('Drop offsets:', { offsets });

		if (new_g == old_g) return;

		const item = groups[old_g].items.splice(i, 1)[0];

		console.log(ev.offsetX, offsets.offsetX);

		item.X = ev.offsetX - offsets.offsetX;
		item.Y = ev.offsetY - offsets.offsetY;
		console.log(item.X);
		groups[new_g].items.push(item);
		groups = groups;
	}
</script>

<div class="group" on:drop={(event) => drop(event, g)} on:dragover={dragover}>
	<slot />
</div>
