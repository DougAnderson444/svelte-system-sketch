<script>
	/**
	 * Basic node. You can drop a new node inside any slot of the Node
	 */
</script>

<div class="node">
	<div class="item">
		<slot name="header">Basic Meta Data Here</slot>
	</div>
	<div class="item">
		<slot name="nodes">x,y coords</slot>
	</div>
	<div class="item">
		<slot name="list">Movable List</slot>
	</div>
</div>

<style>
	.node {
		background-color: rgba(00, 100, 100, 0.025);
		width: 50%;
		padding: 1em;
		border: 1px solid grey;
	}
</style>
