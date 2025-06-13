<script>
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/shadcn/ui/avatar';
	import { Button } from '$lib/components/shadcn/ui/button/index.js';
	import DropdownMenuLabel from './shadcn/ui/dropdown-menu/dropdown-menu-label.svelte';

	import { UserRound } from '@lucide/svelte/icons';

	export let data;

	const createdAt = new Date(data.accDetails.CreatedAt);

	const readableCreatedAt = createdAt.toLocaleString('en-IN', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild>
		<Button>
			Account
			{@render avatarRender(data)}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="max-w-[450px] dropdown ">
		<DropdownMenuLabel>Details</DropdownMenuLabel>
		<DropdownMenu.Group>
			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				{#if data.accDetails.Confirmed}
					<span class="green"> Confirmed </span>
				{:else}
					<span class="red"> Not Confirmed </span>
				{/if}
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Authenticated By : </span>
				<span>{data.accDetails.AuthType}</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Name : </span>
				<span>{data.accDetails.Name}</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Email : </span>
				<span class="truncate" title={data.accDetails.Email}>
					{data.accDetails.Email}
				</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Created At : </span>
				<span>{readableCreatedAt}</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
				<span>Account ID : </span>
				<span>{data.accDetails.UUID}</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item>
				<span>Keyboard shortcuts</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>

		<DropdownMenu.Separator />

		<DropdownMenuLabel>Billing</DropdownMenuLabel>
		<DropdownMenu.Group>
			{#if data.accBilling.Applicable}
				<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
					<span class="green"> Applicable </span>
				</DropdownMenu.Item>

				<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
					<span>Type : </span>
					<span>{data.accBilling.Type}</span>
				</DropdownMenu.Item>

				<DropdownMenu.Item class="grid grid-cols-[140px_1fr] items-center gap-2">
					<span>Next Pay : </span>
					<span>{data.accBilling.NextPay}</span>
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

{#snippet avatarRender(data)}
	<Avatar.Root slot="avatar" class="p-1">
		<Avatar.Image src={data.accDetails.Picture} class="object-cover" />
		<Avatar.Fallback>
			<UserRound />
		</Avatar.Fallback>
	</Avatar.Root>
{/snippet}
