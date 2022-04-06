<script>
</script>

<div class="contain">
	<div class="round" />
	<div class="round" />
	<div class="round" />
	<div class="round" />
</div>

<style>
	:root {
		--size: 0.25em;
		--color: grey;
		--ratio: 4;
	}
	.contain {
		display: flex;
		width: calc(var(--size) * var(--ratio));
		height: calc(var(--size) * var(--ratio));
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	.round {
		border-radius: 25%;
		background-color: var(--color);
		border: 0em solid var(--color);
		width: var(--size);
		height: var(--size);
		margin: calc(var(--size) / 4);
		box-shadow: 0.1em 0.1em 0.1em lightgrey;
	}
</style>
