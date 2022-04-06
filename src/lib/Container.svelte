<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { asDraggable, asDropZone } from 'svelte-drag-and-drop-actions';

	import ResizeHandle from './ResizeHandle.svelte';
	import { scale, selected } from './stores.js';
	import { clickOutside } from './directives';
	import EditableText from './EditableText.svelte';
	import ContextMenu from './ContextMenu.svelte';

	// export let data;
	export let node;
	export let arenaHeight;
	export let arenaWidth;
	export let isDragging = false;

	const dispatch = createEventDispatcher();

	// redraw if arena changes/updates
	$: if (arenaWidth || arenaHeight) assertArenaBounds();

	let container;
	let clientWidth, clientHeight;

	let grid = 20;
	let minFrameWidth = 40;
	let maxFrameWidth = 2500;
	let minFrameHeight = 20;
	let maxFrameHeight = 2500;

	let isFocused;
	let directions = ['nw', 'w', 'sw', 'ne', 'e', 'se', 'n', 's'];

	/**** event handling ***/
	function dragFrame(_x, _y, dx, dy) {
		node.x = node.x + dx / $scale.value;
		node.y = node.y + dy / $scale.value;
		assertArenaBounds();
	}

	function onDragEnd(x, y, dx, dy, extras) {
		isDragging = false;

		node.x = Math.round(node.x / grid) * grid;
		node.y = Math.round(node.y / grid) * grid;
		node.style.width = Math.round(node.style.width / grid) * grid;
		node.style.height = Math.round(node.style.height / grid) * grid;
	}

	function onDrop(x, y, Operation, DataOffered, DroppableExtras, DropZoneExtras) {
		// console.log(`DropZone.onDrop:
		//  x,y:            ${x}, ${y}
		//  Operation:      ', ${Operation}
		//  DataOffered:    ', ${JSON.stringify(DataOffered)}
		//  DroppableExtras:', ${JSON.stringify(DroppableExtras, null, 2)}
		//  DropZoneExtras: ', ${DropZoneExtras}`);

		let TypeAccepted = undefined;
		for (let Type in DataOffered) {
			if (DataOffered.hasOwnProperty(Type)) {
				TypeAccepted = Type;
			}
		}
		node.children = [
			...node.children,
			{ ...DroppableExtras.newContainer, x: x / $scale.value, y: y / $scale.value }
		];
		return TypeAccepted;
	}

	function assertArenaBounds() {
		if (node.x < 0) {
			node.x = 0;
		}
		if (node.x + node.style.width >= arenaWidth) {
			node.x -= node.x + node.style.width - arenaWidth;
		}

		if (node.y < 0) {
			node.y = 0;
		}
		if (node.y + node.style.height >= arenaHeight) {
			node.y -= node.y + node.style.height - arenaHeight;
		}
	}

	$: if ($selected != container) handleUnselect();

	function handleUnselect() {
		isFocused = false;
	}
	function handleFocus(e) {
		container.focus();
		$selected = container;
		isFocused = true;
	}
</script>

<svelte:head>
	<!-- <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Luckiest+Guy" /> -->
</svelte:head>

<!-- {node?.style}   background-color: {node?.backgroundColor}; -->
{#if node && document && clickOutside}
	<div
		class="container"
		bind:this={container}
		bind:clientWidth
		bind:clientHeight
		style="position: absolute; left:{node.x}px; top:{node.y}px; width:{node?.style
			?.width}px; height:{node?.style?.height}px; 
		background-color: {node?.style?.backgroundColor || '#fee9004b'}"
		use:asDraggable={{ onDragStart: { x: node.x, y: node.y }, onDragMove: dragFrame, onDragEnd }}
		use:asDropZone={{ TypesToAccept: { 'item/plain': 'all' }, onDrop }}
		use:clickOutside={{ enabled: isFocused, handleUnselect }}
		on:click|stopPropagation={handleFocus}
		on:focusout={handleUnselect}
	>
		<div class="title"><EditableText bind:value={node.name} /></div>
		<!-- x: {node.x?.toFixed(1)}px; y: {node.y.toFixed(1)}px; <br />
		width: {node.style.width?.toFixed(1)}px; height: {node.style.height.toFixed(1)}px; -->

		<svelte:component this={node.component} bind:props={node.props} />

		{#if node?.children?.length > 0}
			{#each node.children as child}
				<svelte:self
					bind:node={child}
					arenaWidth={clientWidth}
					arenaHeight={clientHeight}
					bind:isDragging
				/>
			{/each}
		{/if}
	</div>

	{#if container && isFocused}
		<!-- Handles  -->
		{#each directions as direction}
			<ResizeHandle
				bind:x={node.x}
				bind:y={node.y}
				bind:width={node.style.width}
				bind:height={node.style.height}
				bind:isDragging
				name={node.name}
				{maxFrameWidth}
				{minFrameWidth}
				{arenaWidth}
				{arenaHeight}
				{maxFrameHeight}
				{minFrameHeight}
				{direction}
				{grid}
			/>
		{/each}
		<!-- OnSelect Context Menu  -->
		<ContextMenu bind:node />
	{/if}
{/if}

<style>
	/* Works, but CDNs are bad...
	@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'); 
	*/

	.title {
		width: 80%;
		height: auto;
		font-size: 1.5em;
		/* font-family: 'Luckiest Guy', cursive; */
		font-family: 'Permanent Marker', cursive;
	}
	.container {
		/* background-color: #fee9004b; */
		box-shadow: 0.1em 0.1em 0.5em 0em rgba(183, 183, 183, 0.5);
		/* box-shadow: 0.1em 0.1em 0.5em 0.1em hwb(0 83% 17% / 0.5); */
		border-radius: 0.2em;
		position: absolute;
		padding: 1em;
		margin: 0.5em;
		width: min-content;
		height: 100%;
		font-size: 0.9em;
	}

	@font-face {
		font-family: 'Permanent Marker';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(/perm-marker.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	@font-face {
		font-family: 'Luckiest Guy';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/luckiestguy/v17/_gP_1RrxsjcxVyin9l9n_j2hTd52.woff2)
			format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
</style>
