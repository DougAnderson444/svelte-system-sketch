export function clickOutside(node, { enabled: initialEnabled, handleUnselect }) {
	const handleOutsideClick = ({ target }) => {
		// !node.contains(target)
		if (node !== target) {
			handleUnselect();
		}
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}
