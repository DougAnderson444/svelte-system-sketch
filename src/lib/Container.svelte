<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import PointerTracker from '@douganderson444/pointer-tracker';

	import ResizeHandle from './ResizeHandle.svelte';
	import { scale, selected } from './stores.js';
	import { clickOutside } from './directives';
	import EditableText from './EditableText.svelte';
	import ContextMenu from './ContextMenu.svelte';
	import Thumbtack from './SVG/thumbtack.svelte';
	import Grid from './SVG/grid.svelte';

	// export let data;
	export let node;
	export let arenaHeight;
	export let arenaWidth;
	export let isDragging = false;

	const dispatch = createEventDispatcher();

	// redraw if arena changes/updates
	$: if (arenaWidth || arenaHeight) assertArenaBounds();

	let nodeEl;
	let clientWidth, clientHeight;

	let grid = 20;
	let minFrameWidth = 40;
	let maxFrameWidth = 2500;
	let minFrameHeight = 20;
	let maxFrameHeight = 2500;

	// how much smaller are nested containers from the parent?
	let fontSize = '0.8em';

	let isFocused;
	let directions = ['nw', 'w', 'sw', 'ne', 'e', 'se', 'n', 's'];
	let pointerTracker;
	let shiftX;
	let shiftY;

	onMount(async () => {
		// Watch for pointers
		pointerTracker = new PointerTracker(nodeEl, {
			start: (pointer, event) => {
				console.log('container start', pointer, event);
				// ignore single pointers on input / editable elements
				if (
					pointerTracker.currentPointers.length === 0 &&
					// @ts-ignore
					(event.target instanceof HTMLInputElement || event.target.isContentEditable)
				) {
					// console.log('single pointers on input / editable element', event.target);
					return false;
				}

				// We only want to track 1 pointers at most (zooming is handled by pzoom for us)
				// if there already exists 1 pointer, and now this would have been the 2nd pointer, stop here
				if (pointerTracker.currentPointers.length === 1) return false;

				// ignore any target not the child of a [data-gripper]
				console.log('GRIPPER container start', event.target?.closest('[data-gripper]'));
				if (!event.target?.closest('[data-gripper]')) {
					return false;
				} else {
					console.log('GRIPPER container start', pointer, event);
				}

				event.stopPropagation(); // otherwise it will move the other containers too
				event.preventDefault();

				// capture the inital pointer offset within the event target
				shiftX = pointer.clientX - nodeEl.getBoundingClientRect().left || 0;
				shiftY = pointer.clientY - nodeEl.getBoundingClientRect().top || 0;
				console.log('container continued', pointer, event);

				return true;
			},
			move: (previousPointers, changedPointers, event) => {
				console.log('container move', { nodeEl }, previousPointers, changedPointers, event);
				event.stopPropagation(); // otherwise it will move the other containers too
				event.preventDefault();
				// @ts-ignore
				let dx = changedPointers[0].clientX - previousPointers[0].clientX;
				// @ts-ignore
				let dy = changedPointers[0].clientY - previousPointers[0].clientY;
				// @ts-ignore
				dragFrame(changedPointers[0].clientX, changedPointers[0].clientY, dx, dy);
			},
			end: (pointer, event, cancelled) => {
				onDragEnd(pointer);
				handleFocus(event);
			},
			avoidPointerEvents: true,
			eventListenerOptions: {
				capture: false
			}
		});
	});

	function dragFrame(_x, _y, dx, dy) {
		// if dragged from the menu, use scale = 1
		node.x = node.x + dx / (nodeEl?.closest('[data-menu]') ? 1 : $scale.value);
		node.y = node.y + dy / (nodeEl?.closest('[data-menu]') ? 1 : $scale.value);
		assertArenaBounds();
	}

	function onDragEnd(pointer) {
		isDragging = false;

		// temporarily reset to original position so you can get elementFromPoint underneath it
		nodeEl.style.left = 0;
		nodeEl.style.top = 0;

		let drop = document.elementFromPoint(pointer.clientX, pointer.clientY);
		let zone = drop.closest('[data-dropzone]');

		if (
			zone &&
			zone !== nodeEl &&
			!nodeEl.contains(zone) &&
			zone?.id !== nodeEl.parentNode.closest('[data-dropzone]')?.id // also not self
		) {
			// add to new zone
			console.log(
				'add to new zone',
				pointer.clientX,
				zone.getBoundingClientRect().left,
				$scale.value,
				shiftX
			);
			// add to new zone 164 138.5 1 84.609375
			// add to new zone 167 138.5 1 0

			zone.dispatchEvent(
				new CustomEvent('end', {
					detail: {
						nodeData: {
							...node,
							x: (pointer.clientX - zone.getBoundingClientRect().left) / $scale.value - shiftX,
							y: (pointer.clientY - zone.getBoundingClientRect().top) / $scale.value - shiftY
						}
					}
				})
			);

			// remove form this node
			removeNode();

			return;
		}

		node.x = Math.round(node.x / grid) * grid;
		node.y = Math.round(node.y / grid) * grid;
		node.style.width = Math.round(node.style.width / grid) * grid;
		node.style.height = Math.round(node.style.height / grid) * grid;
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

	$: if ($selected != nodeEl) handleUnselect();

	function handleUnselect() {
		isFocused = false;
	}
	function handleFocus(e) {
		console.log('focus', e);
		nodeEl.focus();
		$selected = nodeEl;
		isFocused = true;
	}
	function removeNode() {
		// remove node is from parent's children array
		node = null; // delete node // not allowed in strict mode
		dispatch('drop'); // trigger refresh in parent
	}

	function handleEnd(e) {
		const n = e.detail;
		node = {
			...node,
			children: [...node.children, n.nodeData]
		};
	}
</script>

{#if node && document && clickOutside}
	<div
		class="nodeEl"
		id={node.id}
		data-dropzone
		bind:this={nodeEl}
		bind:clientWidth
		bind:clientHeight
		style="position: absolute; left:{node.x}px; top:{node.y}px; width:{node?.style
			?.width}px; height:{node?.style?.height}px; font-size: {fontSize};
		background-color: {node?.style?.backgroundColor || '#fee9004b'}"
		use:clickOutside={{ enabled: isFocused, handleUnselect }}
		on:end={handleEnd}
		on:focusout={handleUnselect}
		on:click|stopPropagation={handleFocus}
		on:keypress|stopPropagation={handleFocus}
	>
		<div
			data-gripper
			data-no-pan
			style="width: 2em; height:auto; position: absolute; top:-.1em; right:0px; margin:1em; padding:.1em; color:grey; filter: drop-shadow(0 10px 0.75em white);"
		>
			<Thumbtack />
			<Grid />
		</div>
		<div class="title">
			<!-- No Editable if on Menu; check if this element is contained within a child of a parent with data-menu attribute  -->
			{#if nodeEl?.closest('[data-menu]')}
				{node.name}
			{:else}
				<EditableText bind:value={node.name} />
			{/if}
			<!-- {node.x?.toFixed(0)} x {node.y.toFixed(0)}<br />Scale: {$scale.value.toFixed(1)} -->
		</div>

		<!-- x: {node.x?.toFixed(1)}px; y: {node.y.toFixed(1)}px; <br />
		width: {node.style.width?.toFixed(1)}px; height: {node.style.height.toFixed(1)}px; -->
		<!-- Container font-size: {nodeEl
			? window.getComputedStyle(nodeEl)['font-size']
			: 'Calculating size...'} -->
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

		{#if nodeEl && isFocused}
			<!-- OnSelect Context Menu  -->
			<ContextMenu bind:node />
		{/if}
	</div>

	{#if nodeEl && isFocused}
		<!-- Handles  -->
		{#each directions as direction}
			<ResizeHandle
				bind:x={node.x}
				bind:y={node.y}
				bind:width={node.style.width}
				bind:height={node.style.height}
				bind:isDragging
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
	{/if}
{/if}

<style>
	/* Works, but CDNs are bad... */
	@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

	.title {
		width: 80%;
		height: auto;
		font-size: 1em;
		/* font-family: 'Luckiest Guy', cursive; */
		font-family: 'Permanent Marker', cursive;
	}
	.nodeEl {
		box-shadow: 0.1em 0.1em 0.5em 0em rgba(183, 183, 183, 0.5);
		border-radius: 0.2em;
		position: absolute;
		padding: 1em;
		margin: 0.5em;
		width: min-content;
		height: 100%;
	}

	@font-face {
		font-family: 'Permanent Marker';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(./fonts/perm-marker.woff2) format('woff2');
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
