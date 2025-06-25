import { writable } from 'svelte/store';
import { settings } from './lens-global.ts';

const THEME_KEY = 'theme';

export type Theme = {
	Label: string;
	Value: string;
}

export const themesList = writable<Theme[]>([
	{
		Label: "Light",
		Value: "light"
	},
	{
		Label: "Dark",
		Value: "dark"
	}
]);

export const currentTheme = writable('light');

export function setTheme(theme: string) {
	if (theme !== 'light' && theme !== 'dark') return;

	localStorage.setItem(THEME_KEY, theme);
	document.documentElement.setAttribute('data-theme', theme);
	currentTheme.set(theme);

	settings.update((s) => ({
		...s,
		Theme: theme,
	}))
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
