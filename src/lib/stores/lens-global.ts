import { writable } from 'svelte/store';

import type { Settings } from '$lib/types/global.ts';
import {type Row } from '@tanstack/table-core';

export const settings = writable<Settings>({
  AdvancedMetaData: false,
  CompactView: false,
  AutoRefreshInterval: 30,
  Notifications: true,

  Theme: 'light',
  FontSize: 16,
  ShowToolTips: true,
  KeyboardShortcuts: true,
});

export const locsSelected = writable<any[]>();

