<div class="basic">
	<slot name="header" />
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
		width: fit-content;
		min-width: 100px;
		padding: 0.4em;
		margin: 0.4em auto;
		/* this will allow the dragged element to scroll the list */
		overflow-y: auto;
		height: auto;
		/* background-color: rgba(100, 100, 100, 0.1); */
		min-height: 10px;
	}
</style>
