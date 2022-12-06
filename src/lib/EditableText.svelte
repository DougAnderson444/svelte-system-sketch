<script>
	import { createEventDispatcher } from 'svelte';
	import { tick } from 'svelte';
	import { clickOutside } from './directives';

	// Props
	export let value = '';
	export let labelClasses = '';

	let offsetWidth;
	let editing = false;
	let inputEl;
	let label = value; // init

	const dispatch = createEventDispatcher();

	async function toggle(event) {
		editing = !editing;
		console.log(`editing toggled to ${editing}`);
		if (editing) {
			await tick();
			inputEl.focus();
		} else {
			stopEditing();
		}
	}

	function stopEditing() {
		editing = false;
		value = label; // finalize, save to db
		dispatch('doneEditing');
	}

	const handleEnter = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			inputEl.blur();
		}
	};

	const handleBlur = (_) => {
		if (value != '' && value != null) toggle();
		else value = 'Enter Value';

		if (window.getSelection) {
			if (window.getSelection().empty) {
				// Chrome
				window.getSelection().empty();
			} else if (window.getSelection().removeAllRanges) {
				// Firefox
				window.getSelection().removeAllRanges();
			}
		} else if (document.selection) {
			// IE?
			document.selection.empty();
		}
	};

	function handleInput(e) {
		inputEl.setAttribute('data-heading', inputEl.innerText);
	}

	function handleUnselect(e) {
		if (document.activeElement === inputEl) inputEl.blur();
	}
</script>

<div
	contenteditable
	class={labelClasses}
	on:keydown={handleEnter}
	on:blur={handleBlur}
	bind:this={inputEl}
	bind:innerHTML={label}
	on:click={toggle}
	use:clickOutside={{ enabled: editing, handleUnselect }}
/>

<style>
	div {
		display: inline-block;
		width: 100%;
		height: auto;
	}
</style>
