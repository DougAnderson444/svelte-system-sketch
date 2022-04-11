<script>
	import Canvas from './Canvas.svelte';
	import Menu from './Menu.svelte';
	import Nodes from './Nodes.svelte';
	import Links from './Links.svelte';
	import Object from './Object.svelte';
	import Wrapper from './Wrapper.svelte';

	import { pzoom } from '@douganderson444/panzoom-node';
	import Container from './Container.svelte';
	import { scale } from './stores.js';

	export let data;
	export let width = 400;
	export let height = 600;

	let clientWidth, clientHeight;
	let zoomable;

	function handleChange(e) {
		let m;
		const re = /(\w+)\(([^)]*)\)/g;
		while ((m = re.exec(zoomable.style.transform))) {
			if (m[1] == 'scale' && parseFloat(m[2]).toFixed(2) != $scale.value.toFixed(2)) {
				$scale.value = parseFloat(m[2]);
			}
		}
	}
</script>

{#if $scale}
	<div
		class="canvas"
		style="height: {height}px; width: {width}px;"
		bind:clientWidth
		bind:clientHeight
	>
		<Menu bind:scale={$scale.value} />
		{width}px x {height}px

		<div class="zoomable flexbox" use:pzoom on:change={handleChange} bind:this={zoomable}>
			<Container bind:node={data} arenaWidth={clientWidth * 100} arenaHeight={clientHeight * 100} />
			<!-- <Links links={data.links} /> -->
		</div>
		<!-- <Object val={data} /> -->
	</div>
{/if}

<style>
	.canvas {
		border: 1px solid forestgreen;
		margin: 0em;
		overflow: hidden;
	}
	.zoomable {
		border-top: 1px dashed fuchsia;
		border-left: 1px dashed fuchsia;
		height: 100%;
		width: 100%;
	}
	.flexbox {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
	}
</style>
