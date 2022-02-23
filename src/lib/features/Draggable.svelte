<script>
	export let groups;
	export let g;
	export let i = null;

	export function dragstart(ev, group, item) {
		ev.dataTransfer.setData('group', String(group));
		ev.dataTransfer.setData('item', String(item));
	}
</script>

<div class="draggable" draggable={true} on:dragstart={(event) => dragstart(event, g, i)}>
	<slot />
</div>
