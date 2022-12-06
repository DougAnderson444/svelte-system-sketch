<script>
	import { colors } from '$lib/config';
	export let backgroundColor = '#fee9004b';
</script>

<main>
	{#if backgroundColor && colors}
		{#each colors as color, c}
			<button
				class="colorOption"
				on:click={(e) => (backgroundColor = color)}
				style="background-color: {color};"
			>
				<!-- I get thisstrange error when using <div/> instead of <div> </div> -->
				&nbsp; &NonBreakingSpace;
			</button>
		{/each}
	{/if}
</main>

<style>
	.colorOption {
		height: 1em;
		width: 1em;
	}
	main {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 12em;
		background-color: var(--bgColor);
		z-index: 99;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: flex-start;
	}
</style>
