<script>
	let box;
	let offsetHeight, offsetWidth;

	$: spotX = box?.getBoundingClientRect().left.toFixed(0);
	$: spotY = box?.getBoundingClientRect().top.toFixed(0);
</script>

<div class="basic" bind:this={box} bind:offsetHeight bind:offsetWidth>
	<slot name="header" />
	<!-- {spotX}, {spotY} -->

	<div class="groups">
		<slot name="groups" />
	</div>

	<div class="children">
		<slot name="children" />
	</div>
</div>

<style>
	.basic {
		width: auto;
		padding: 0.4em;
	}
	.children {
		/* width: fit-content; */
		min-width: 100px;
		padding: 0.4em;
		margin: 0.5em auto;
		/* this will allow the dragged element to scroll the list */
		/* overflow-y: auto; */
		/* height: auto; */
		/* background-color: rgba(100, 100, 100, 0.1); */
		/* min-height: 10px; */
	}
</style>
