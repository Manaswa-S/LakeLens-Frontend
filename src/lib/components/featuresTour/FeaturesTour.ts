import { latestFeaturesTourVersion, versionMap } from "./tours"

export type FeatureTour = {
	LastTour: number
}

export function processFeaturesTour(data: FeatureTour) {
	for (let index = data.LastTour + 1; index <= latestFeaturesTourVersion; index++) {
		const a = versionMap.get(index)
		a?.();
	}
}


export async function doneTour(version: number) {
	const update = await fetch(`/api/tour/${version}`);
	const resp = await update.json();
	console.log(resp);
}



