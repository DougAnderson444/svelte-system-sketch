<script>
	/**
	 * Svelte DND Action draggable handle example
	 */

	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	export let data;
	export let props;

	const flipDurationMs = 200;
	let dragDisabled = true;

	function handleConsider(e) {
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		props = newItems;
		// Ensure dragging is stopped on drag finish via keyboard
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
	}
	function handleFinalize(e) {
		const {
			items: newItems,
			info: { source }
		} = e.detail;
		props = newItems;
		// Ensure dragging is stopped on drag finish via pointer (mouse, touch)
		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}
		data = data;
	}
	function startDrag(e) {
		// preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
		e.preventDefault();
		dragDisabled = false;
	}
	function handleKeyDown(e) {
		if ((e.key === 'Enter' || e.key === ' ') && dragDisabled) dragDisabled = false;
	}
</script>

<section
	use:dndzone={{ items: props, dragDisabled, flipDurationMs }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each props as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<div
				tabindex={dragDisabled ? 0 : -1}
				aria-label="drag-handle"
				class="handle"
				style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
				on:mousedown={startDrag}
				on:touchstart={startDrag}
				on:keydown={handleKeyDown}
			>
				<svg xmlns="http://www.w3.org/2000/svg">
					<circle cx="3" cy="3" r="3" />
					<circle cx="12" cy="3" r="3" />
					<circle cx="3" cy="12" r="3" />
					<circle cx="12" cy="12" r="3" />
				</svg>
			</div>
			<span>{item.text}</span>
		</div>
	{/each}
</section>

<style>
	div {
		position: relative;
		height: 1.5em;
		width: 10em;
		text-align: center;
		/* 		border: 1px solid black; */
		margin: 0.2em;
		padding: 0em;
	}
	.handle {
		position: absolute;
		left: 2;
		width: 1.25em;
		height: 1.5em;
	}
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	circle {
		fill: lightgrey;
	}
</style>
