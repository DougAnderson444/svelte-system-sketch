<script>
	export let val;
</script>

{#if val}
	<ul>
		{#each [...Object.entries(val)] as [key, val]}
			<li>
				{#if typeof val === 'object'}
					{key} <svelte:self {key} {val} />
				{:else}
					{key}
					:
					{val}
				{/if}
			</li>
		{/each}
	</ul>
{/if}
