<div class="wrapper">
	<div class="canvas"><slot /></div>
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
