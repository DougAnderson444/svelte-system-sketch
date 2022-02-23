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

		// console.log({ new_g, old_g }, new_g == old_g);
		if (new_g == old_g) return;

		const item = groups[old_g].items.splice(i, 1)[0];
		groups[new_g].items.push(item);
		groups = groups;
	}
</script>

<div class="group" on:drop={(event) => drop(event, g)} on:dragover={dragover}>
	<slot />
</div>
