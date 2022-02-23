<script>
	export let canvas;
	$: canvas = { ...canvas, offsetHeight, offsetWidth };
	let offsetHeight;
	let offsetWidth;
</script>

<div class="wrapper">
	<div class="canvas" bind:this={canvas} bind:offsetHeight bind:offsetWidth>
		Canvas {canvas?.offsetWidth} x {canvas?.offsetHeight}<br />
		Bind:Canvas {offsetWidth} x {offsetHeight}
		<slot />
	</div>
</div>

<style>
	.wrapper {
		height: 100%;
		width: 100%;
		overflow: hidden;
		position: relative;
		border: 1px dashed grey;
	}
	.canvas {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: var(--pal-border-light);
	}
</style>
