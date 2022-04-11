<script>
	import { colors } from '$lib/config';
	export let backgroundColor;

	function handleClick(color) {
		backgroundColor = color;
	}
</script>

<main>
	{#if colors}
		{#each colors as color}
			<div
				class="colorOption"
				on:click|stopPropagation={(e) => handleClick(color)}
				style="background-color: {color};"
			/>
		{/each}
	{/if}
</main>

<style>
	.colorOption {
		height: 20px;
		width: 20px;
	}
	main {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 170px;
		background-color: var(--bgColor);
		z-index: 99;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: flex-start;
	}
</style>
