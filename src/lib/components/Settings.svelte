<script>
	import * as Dialog from '$lib/components/shadcn/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/shadcn/ui/button/index.js';
	import { Input } from '$lib/components/shadcn/ui/input/index.js';
	import { Label } from '$lib/components/shadcn/ui/label/index.js';
	import { Switch } from '$lib/components/shadcn/ui/switch/index.js';
	import * as Tooltip from '$lib/components/shadcn/ui/tooltip/index.js';
	import CalendarDaysIcon from '@lucide/svelte/icons/calendar-days';
	import * as Avatar from '$lib/components/shadcn/ui/avatar/index.js';
	import * as HoverCard from '$lib/components/shadcn/ui/hover-card/index.js';
	import * as Select from '$lib/components/shadcn/ui/select/index.js';
	import Info from '@lucide/svelte/icons/info';
	import { Progress } from '$lib/components/shadcn/ui/progress/index';

	// TODO: this whole theme switching is wrong
	import { currentTheme, toggleTheme } from '$lib/styles/theme';
	$: currTheme = $currentTheme;
	const switchTheme = () => {
		toggleTheme();
	};
	const themes = [
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	];

	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

	import { settings } from '$lib/stores/lens-global.ts';

	let firstLoad = true;

	import { get } from 'svelte/store';

	import { toast } from 'svelte-sonner';

	let debounceID = 0;

	async function saveSettings() {
		const settingsData = get(settings);
		const update = await fetch('/api/account/settings', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(settingsData)
		});

		const resp = await update.json();

		if (update.status === 200) {
			toast.success('Settings updated.');
		} else {
			toast.success('Failed to update settings.');
		}
	}
	function saveHelper() {
		if (firstLoad) {
			firstLoad = false;
			return;
		}

		const runID = ++debounceID;

		setTimeout(() => {
			if (runID === debounceID) saveSettings();
		}, 5000);
	}
	$: saveHelper($settings);
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: '' })}>Settings</Dialog.Trigger>
	<Dialog.Content class="settings max-w-lg">
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
		</Dialog.Header>

		<div class="setting-switch">
			<Label for="advanced-mode" class="flex items-center gap-1"
				>Advanced Metadata
				{@render infoHover(
					'',
					'Enables additional metadata. Requires more resources and takes longer to load.'
				)}
			</Label>
			<Switch bind:checked={$settings.AdvancedMetaData} id="advanced-mode" />
		</div>

		<div class="flex items-center space-x-2 setting-switch">
			<Label for="compact-view" class="flex items-center gap-1">
				Compact View
				{@render infoHover('', 'Reduces padding and spacing to show more data on screen.')}
			</Label>
			<Switch bind:checked={$settings.CompactView} id="compact-view" />
		</div>

		<div class="flex items-center space-x-2 setting-switch">
			<Label for="show-tooltips" class="flex items-center gap-1">
				Show Tool Tips
				{@render infoHover(
					'',
					'Displays helpful tips or extra metadata on hover across the interface.'
				)}
			</Label>
			<Switch bind:checked={$settings.ShowToolTips} id="show-tooltips" />
		</div>

		<div class="flex items-center space-x-2 setting-switch">
			<Label for="notifications" class="flex items-center gap-1">
				Notifications
				{@render infoHover(
					'',
					'Enables toast or system notifications for major events. Stay in the loop while working.'
				)}
			</Label>
			<Switch bind:checked={$settings.Notifications} id="notifications" />
		</div>

		<div class="flex items-center space-x-2 setting-switch">
			<Label for="font-size" class="flex items-center gap-1">
				Font Size
				{@render infoHover('', 'Adjusts the base font size for table or metadata display.')}
			</Label>

			<Input
				id="font-size"
				type="number"
				min="8"
				max="32"
				placeholder="e.g. 14"
				class="w-24 settings-input"
				value={$settings.FontSize}
			/>
		</div>

		<div class="flex items-center space-x-2 setting-switch">
			<Label for="auto-refresh-interval" class="flex items-center gap-1">
				Auto Refresh Interval
				{@render infoHover(
					'',
					'Automatically refreshes data or metadata at regular intervals. Too frequent refreshes may impact performance.'
				)}
			</Label>

			<Input
				id="auto-refresh-interval"
				type="number"
				min="5"
				max="60"
				placeholder="e.g. 14"
				class="w-24 settings-input"
				value={$settings.AutoRefreshInterval}
			/>
		</div>

		<div class="flex items-center space-x-2 setting-switch">
			<Label for="keyboard-shortcuts" class="flex items-center gap-1">
				Keyboard Shortcuts
				{@render infoHover(
					'',
					'Activates keyboard navigation and shortcut commands for faster interaction.'
				)}
			</Label>
			<Switch bind:checked={$settings.KeyboardShortcuts} id="keyboard-shortcuts" />
		</div>

		<div class="flex items-center space-x-2 setting-switch">
			<Label for="theme" class="flex items-center gap-1">
				Theme
				{@render infoHover('', 'Switch between light and dark themes for your preferred look.')}
			</Label>

			{@render select(
				themes,
				themes.find((t) => t.value === currTheme)
			)}
		</div>
	</Dialog.Content>
</Dialog.Root>

{#snippet infoHover(title, desc)}
	<HoverCard.Root>
		<HoverCard.Trigger>
			<Info class="w-4 h-4" />
		</HoverCard.Trigger>
		<HoverCard.Content class="hovercard">
			<div>
				<h4 class="text-sm font-semibold">{title}</h4>
				<p class="text-sm">{desc}</p>
			</div>
		</HoverCard.Content>
	</HoverCard.Root>
{/snippet}

{#snippet select(items, trigger)}
	<Select.Root type="single">
		<Select.Trigger class="w-24 select-trigger">{trigger.label}</Select.Trigger>
		<Select.Content class="select" on:change={switchTheme}>
			<Select.Group>
				{#each items as item (item.value)}
					<Select.Item value={item.value} label={item.label}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{/snippet}
