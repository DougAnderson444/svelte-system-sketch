<script>
	import { colors } from '$lib/config';
	export let backgroundColor;
</script>

<main>
	{#each colors as color}
		<div
			class="colorOption"
			on:click|stopPropagation={(_) => (backgroundColor = color)}
			style="background-color: {color};"
		/>
	{/each}
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
