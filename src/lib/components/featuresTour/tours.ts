
import { playV1 } from '$lib/components/featuresTour/v1.ts';


export let latestFeaturesTourVersion = 1;

export let versionMap: Map<number, () => void> = new Map([
    [1, playV1],
]);
