<script lang="ts">
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';
	import * as Avatar from '$lib/components/shadcn/ui/avatar';
	import { Button } from '$lib/components/shadcn/ui/button/index.ts';
	import DropdownMenuLabel from '$lib/components/shadcn/ui/dropdown-menu/dropdown-menu-label.svelte';
	import { UserRound } from '@lucide/svelte/icons';

	import { profileData, accBilling } from '$lib/stores/lens-global.ts';
	import { toReadableTime } from '$lib/common/time.ts';

	let {} = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button>
			Account
			{@render avatarRender($profileData.Picture)}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="max-w-[450px] dropdown ">
		<DropdownMenuLabel>Details</DropdownMenuLabel>
		<DropdownMenu.Group>
			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				{#if $profileData.Confirmed}
					<span class="green"> Confirmed </span>
				{:else}
					<span class="red"> Not Confirmed </span>
				{/if}
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Authenticated By : </span>
				<span>{$profileData.AuthType}</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Name : </span>
				<span>{$profileData.Name}</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Email : </span>
				<span class="truncate" title={$profileData.Email}>
					{$profileData.Email}
				</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Created At : </span>
				<span>{toReadableTime($profileData.CreatedAt)}</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Account ID : </span>
				<span>{$profileData.UUID}</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item>
				<span>Keyboard shortcuts</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>

		<DropdownMenu.Separator />

		<DropdownMenuLabel>Billing</DropdownMenuLabel>
		<DropdownMenu.Group>
			{#if $accBilling.Applicable}
				<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
					<span class="green"> Applicable </span>
				</DropdownMenu.Item>

				<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
					<span>Type : </span>
					<span>{$accBilling.Type}</span>
				</DropdownMenu.Item>

				<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
					<span>Next Pay : </span>
					<span>{toReadableTime($accBilling.NextPay)}</span>
				</DropdownMenu.Item>
			{:else}
				<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
					<span class="red"> Not Applicable </span>
				</DropdownMenu.Item>
			{/if}
		</DropdownMenu.Group>

		<DropdownMenu.Separator />

		<DropdownMenuLabel>Collaborate</DropdownMenuLabel>
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<span>Team</span>
			</DropdownMenu.Item>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<span>Invite users</span>
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item>
						<span>Email</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<span>Message</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<span>More...</span>
					</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
			<DropdownMenu.Item>
				<span>New Team</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>

		<DropdownMenu.Separator />

		<DropdownMenuLabel>Connect</DropdownMenuLabel>
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<span>GitHub</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<span>Support</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<span>API</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>

		<DropdownMenu.Separator />

		<DropdownMenu.Item>
			<span>Log out</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

{#snippet avatarRender(avatarSrc: string)}
	<Avatar.Root slot="avatar" class="p-1">
		<Avatar.Image src={avatarSrc} class="object-cover" />
		<Avatar.Fallback>
			<UserRound />
		</Avatar.Fallback>
	</Avatar.Root>
{/snippet}
