<script>
	import { Button } from '$lib/components/shadcn/ui/button/index.js';
	import { Label } from '$lib/components/shadcn/ui/label/index.js';
	import { Input } from '$lib/components/shadcn/ui/input/index.js';
	import * as Card from '$lib/components/shadcn/ui/card/index.js';
	import { toReadableTime } from '$lib/common/readableTime';

	export let loc;

	const createdAt = toReadableTime(loc.CreatedAt);
</script>

<!-- <div class="flex justify-center items-start p-4"> -->
<Card.Root class="project-card">
	<Card.Header>
		<Card.Title class="text-lg font-semibold">Name: {loc.BucketName}</Card.Title>
	</Card.Header>

	<Card.Content class="space-y-2 py-2 flex flex-col gap-2">
		<Label>Location ID: {loc.LocID}</Label>
		<Label>Lake ID: {loc.LakeID}</Label>
		<Label>Created At: {createdAt}</Label>
	</Card.Content>
</Card.Root>
<!-- </div> -->
