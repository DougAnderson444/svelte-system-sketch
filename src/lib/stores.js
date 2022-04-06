import { writable } from 'svelte/store';

export const scale = writable({ value: 1 });
export const selected = writable(null);
