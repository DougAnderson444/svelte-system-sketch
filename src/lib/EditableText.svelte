<script>
	import { createEventDispatcher } from 'svelte';
	import { tick } from 'svelte';
	import { clickOutside } from './directives';

	// Props
	export let value = '';
	export let type = 'text';
	export let placeholder = '';
	export let labelClasses = '';

	let offsetWidth;
	let editing = false;
	let inputEl;
	let label = value; // init

	const dispatch = createEventDispatcher();

	// Computed
	// $: isText = type === 'text';
	// $: isNumber = type === 'number';
	// $: if (isNumber) {
	// 	label = value === '' ? placeholder : value;
	// } else if (isText) {
	// 	label = value ? value : placeholder;
	// }

	async function toggle(event) {
		editing = !editing;
		console.log(`editing toggled to ${editing}`);
		if (editing) {
			await tick();
			inputEl.focus();
			// inputEl.setSelectionRange(0, label.length);

			let range = document.createRange();
			console.log({ inputEl });
			range.setStart(inputEl.firstChild, 0); // 6 is the offset of "world" within "Hello world"
			range.setEnd(inputEl.firstChild, inputEl.firstChild.length); // 7 is the length of "this is"
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
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
		console.log('blur occurred');

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
</script>

<div bind:offsetWidth>
	{#if editing}
		<span
			contenteditable
			class={labelClasses}
			on:keydown={handleEnter}
			on:blur={handleBlur}
			bind:this={inputEl}
			bind:innerHTML={label}
		>
			{label}
		</span>
	{:else}
		<div class={labelClasses} on:input={toggle} on:click={toggle} bind:this={inputEl}>
			{@html label}
		</div>
	{/if}
</div>

<style>
	div {
		display: inline-block;
		width: 100%;
		height: auto;
	}
</style>
