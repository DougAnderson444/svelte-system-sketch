import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid/non-secure';

export function safeid(n: number = 16): string {
	return customAlphabet('abcdefghijklmnopqrztuvwxyz1234567890', n)();
}

export default safeid;

export function createNewNode(params: type) {
	const newNode = {
		name: 'Name',
		id: safeid(),
		x: 10,
		y: 10,
		style: {
			backgroundColor: '#fee9004b',
			width: 120,
			height: 120,
			left: 10,
			top: 10
		},
		// component: DragHandles,
		props: [],
		children: []
	};

	return newNode;
}
