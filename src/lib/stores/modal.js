import { writable } from 'svelte/store';

export const modalState = writable({
	show: false,
	type: 'info', // 'success', 'error', 'confirm', 'input'
	msg: '',
	countdown: 0,
	redirect: '',
	confirmCallback: null,
	inputValue: ''
});
