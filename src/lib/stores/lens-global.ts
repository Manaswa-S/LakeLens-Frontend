import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';
import { get, writable } from 'svelte/store';

import { type LakeDetails, type LocDetails } from '$lib/types/global.ts';



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Account settings related data.

export type Settings = {
  // Preferences
  AdvancedMetaData: boolean
  CompactView: boolean
  AutoRefreshInterval: Number
  Notifications: boolean
  // UI/UX
  Theme: string
  FontSize: number
  ShowToolTips: boolean
  // Usage
  KeyboardShortcuts: boolean
};

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

let debounceID: number = 0;
let initialized: number = 0;
if (browser) {
  settings.subscribe(() => {
    initialized++;
    // console.log(initialized)
    if (initialized <= 3) { // the settings obj is updated 2 times onMount. + 1 for the initial subscribe call.
      return;
    }
    syncSettings();
  })
}

async function saveSettings() {
  const settingsData = get(settings);
  const update = await fetch('/api/account/settings', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settingsData)
  });

  if (update.status === 200) {
    toast.success('Settings updated.');
  } else {
    toast.error('Failed to update settings.');
  }
}
function syncSettings() {
  const runID = ++debounceID;
  setTimeout(() => {
    if (runID === debounceID) saveSettings();
  }, 5000);
}





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Sidebar related data.

export type ProjectsList = { Lake: LakeDetails; Locs: LocDetails[] };

export const projectsList = writable<ProjectsList[]>();

export async function refreshSidebar() {
  await getProjects();
  return true;
}

export async function getProjects() {
  projectsList.set([]);
  // setTimeout(async () => {
  const req = await fetch('/api/account/projects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resp = await req.json();
  projectsList.set(resp.data.LocsForLake);
  // }, 5000);
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Profile menu related data.

export type ProfileData = {
  Email: string;
  CreatedAt: string;
  Confirmed: boolean;
  UUID: string;

  Name: string;
  Picture: string;

  AuthType: string;
}

export const profileData = writable<ProfileData>();



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Account billings related data.

export type AccBilling = {
  Type: string;
  Applicable: boolean;
  NextPay: string;
}

export const accBilling = writable<AccBilling>();
