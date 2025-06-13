import { writable } from 'svelte/store';

const THEME_KEY = 'theme';
export const currentTheme = writable('light'); // reactive store

export function setTheme(theme) {
	if (theme !== 'light' && theme !== 'dark') return;

	localStorage.setItem(THEME_KEY, theme);
	document.documentElement.setAttribute('data-theme', theme);
	currentTheme.set(theme);
}

export function getTheme() {
	return localStorage.getItem(THEME_KEY) || 'light';
}

export function toggleTheme() {
	const current = getTheme();
	const next = current === 'dark' ? 'light' : 'dark';
	setTheme(next);
}

export function initTheme() {
	const saved = getTheme();
	setTheme(saved);
}
