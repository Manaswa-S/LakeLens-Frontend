<script lang="ts">
	import { Label } from '$lib/components/shadcn/ui/label/index.ts';
	import * as Card from '$lib/components/shadcn/ui/card/index.ts';
	import { toReadableTime } from '$lib/common/time.ts';

	export let lake;
	const createdAt = toReadableTime(lake.CreatedAt);
</script>

<Card.Root class="project-card">
	<Card.Header>
		<Card.Title class="text-lg font-semibold">Name: {lake.Name}</Card.Title>
	</Card.Header>

	<Card.Content class="space-y-2 py-2 flex flex-col gap-2">
		<Label>Lake ID: {lake.LakeID}</Label>
		<Label>Created At: {createdAt}</Label>
		<Label>Provider: {lake.Ptype}</Label>
		<Label>Region: {lake.Region}</Label>
	</Card.Content>
</Card.Root>
