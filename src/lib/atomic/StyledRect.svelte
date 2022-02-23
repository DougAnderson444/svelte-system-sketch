<script>
	export let rectColor = '#' + (((1 << 24) * Math.random()) | 0).toString(16);
</script>

<div class="styleRect" style="background-color: {rectColor}">
	<slot>A Basic Rect</slot>
	<div class="footer">
		<slot name="footer" />
	</div>
</div>

<style>
	div {
		color: black;
	}
	.styleRect {
		--width: 100px;
		--height: 100px;
		width: var(--width);
		height: var(--height);
		border-radius: 4px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
		padding: 1em;
	}
	.footer {
		color: black;
	}
</style>
