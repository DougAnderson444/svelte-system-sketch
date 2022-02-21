export let params;

export function draggable(node, params) {
	// the node has been mounted in the DOM

	return {
		update(bar) {
			// the value of `bar` has changed
		},

		destroy() {
			// the node has been removed from the DOM
		}
	};
}

export const panstart = 'panstart';

export function pannable(node, { grp, itm }) {
	let x;
	let y;

	function handleMousedown(event) {
		x = event.clientX;
		y = event.clientY;

		if (
			node &&
			node.contains(event.target) &&
			event.target.parentNode === node &&
			!event.defaultPrevented
		) {
			node.dispatchEvent(
				new CustomEvent('panstart', {
					detail: { x, y }
				})
			);

			window.addEventListener('mousemove', handleMousemove);
			window.addEventListener('mouseup', handleMouseup);
		}
	}

	function handleMousemove(event) {
		const dx = event.clientX - x;
		const dy = event.clientY - y;
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(
			new CustomEvent('panmove', {
				detail: { x, y, dx, dy }
			})
		);
	}

	function handleMouseup(event) {
		x = event.clientX;
		y = event.clientY;

		node.dispatchEvent(
			new CustomEvent('panend', {
				detail: { x, y, grp, itm }
			})
		);

		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}

	node.addEventListener('mousedown', handleMousedown);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
		}
	};
}
