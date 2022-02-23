let isPanning: boolean = false;

export function panzoom(node, { getJsPlumbInstance, getCurrentFlow }) {
	function handleMouseDown(event: MouseEvent) {
		console.log('handleMouseDown');

		if (event.target === node && event.button === 0) {
			event.target.addEventListener('mousemove', handlePanning);
		}
	}

	function handleMouseUp(event: MouseEvent) {
		console.log('handleMouseUp');

		if (event.target === node && event.button === 0) {
			event.target.removeEventListener('mousemove', handlePanning);
			handleEndPan();
		}
		console.log('Triggering simulate');
		// node.dispatchEvent(new CustomEvent('simulate'));
	}

	async function handleDragEnd(event) {
		console.log('handleDragEnd');

		event.preventDefault();
		console.debug(event);
		const tableId = event.dataTransfer.getData('text/plain');
		const table = tables.find((t) => t.id === tableId);
		if (table !== undefined) {
			addNode({ ...table, left: event.x, top: event.y } as INode);
			await tick();
			getJsPlumbInstance().repaintEverything();
		}
	}

	function panElements(el: HTMLDivElement, deltaX: number, deltaY: number) {
		Array.from(el.children as HTMLCollectionOf<HTMLElement>).forEach((child) => {
			const style = getComputedStyle(child);
			const top = parseInt(style['top']) | 0;
			const left = parseInt(style['left']) | 0;
			child.style['left'] = `${left + deltaX}px`;
			child.style['top'] = `${top + deltaY}px`;
		});
	}

	function handlePanning(event: MouseEvent) {
		let el: HTMLDivElement = getJsPlumbInstance().getContainer();
		let deltaX = (event.x - getCurrentFlow().pan.x) * (1 / getCurrentFlow().zoom);
		let deltaY = (event.y - getCurrentFlow().pan.y) * (1 / getCurrentFlow().zoom);
		if (isPanning === false) {
			[deltaX, deltaY] = [0, 0];
		}
		getCurrentFlow().pan = { x: event.x, y: event.y };
		panElements(el, deltaX, deltaY);
		getJsPlumbInstance().repaintEverything();
		isPanning = true;
	}

	function handleEndPan() {
		isPanning = false;
	}

	function handleScroll(event: WheelEvent) {
		event.preventDefault();
		if (event.deltaY > 0) {
			getCurrentFlow().zoom -= 0.025;
		} else if (event.deltaY < 0) {
			getCurrentFlow().zoom += 0.025;
		}
		getCurrentFlow().zoom = Math.min(Math.max(0.25, getCurrentFlow().zoom), 2);
		setZoom(getCurrentFlow().zoom);
	}

	function setZoom(zoom: number, transformOrigin = [0.0, 0.0]) {
		let el = getJsPlumbInstance().getContainer();
		let s = `scale(${zoom})`;
		let oString = transformOrigin[0] + '% ' + transformOrigin[1] + '%';

		el.style['transform'] = s;
		el.style['transformOrigin'] = oString;
		el.style['height'] = 100 / zoom + '%';
		el.style['width'] = 100 / zoom + '%';

		getJsPlumbInstance().setZoom(zoom, true);
	}

	node.addEventListener('wheel', handleScroll, true);
	node.addEventListener('mousedown', handleMouseDown, true);
	node.addEventListener('mouseup', handleMouseUp, true);
	node.addEventListener('mouseout', handleMouseUp, true);
	node.addEventListener('drop', handleDragEnd, true);
	node.addEventListener('dragenter', (event) => event.preventDefault(), true);
	node.addEventListener('dragover', (event) => event.preventDefault(), true);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown, true);
			node.removeEventListener('mouseup', handleMouseUp, true);
			node.removeEventListener('mouseout', handleMouseUp, true);
			node.removeEventListener('drop', handleDragEnd, true);
			node.removeEventListener('dragenter', (event) => event.preventDefault(), true);
			node.removeEventListener('dragover', (event) => event.preventDefault(), true);
		}
	};
}
