import gridHelp from 'svelte-grid/build/helper/index.mjs';

import StorageDistribution from '$lib/components/mainarea/widgets/init/StorageDistribution.svelte';
import FileLineage from '$lib/components/mainarea/widgets/init/FileLineage.svelte';
import WelcomeInit from './widgets/init/WelcomeInit.svelte';
import RecentActivity from './widgets/init/RecentActivity.svelte';
import BucketChecks from './widgets/init/BucketChecks.svelte';
import Tips from './widgets/init/Tips.svelte';


import LocData from '$lib/components/mainarea/widgets/analyze/LocData.svelte';
import Graphs from '$lib/components/mainarea/widgets/analyze/Graphs.svelte';
import Metadata from '$lib/components/mainarea/widgets/analyze/Metadata.svelte';
import Statistics from '$lib/components/mainarea/widgets/analyze/Statistics.svelte';
import { projectsList } from '$lib/stores/lens-global';


export type Widget = {
    Render: any; // the .svelte to render
    Params: any; // the params to pass to {Render}.
}
export type WidgetConfig = {
    Draggable: boolean;
    Resizeable: boolean;
    Reloadable: boolean;
}


// The initial, on load setup.
type InitItem = {
    5: any;
    10: any;
    15: any;
    20: any;
    id: string;
    Config?: WidgetConfig;
    Widget: Widget;
    Reload: number;
}
export const initCols = [
    [800, 5],
    [1300, 10],
    [1500, 15],
    [2000, 20]
]
export let initItems: InitItem[] = [
    {
        5: gridHelp.item({
            x: 0,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 }
        }),

        10: gridHelp.item({
            x: 0,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 }
        }),

        15: gridHelp.item({
            x: 0,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 },
        }),
        20: gridHelp.item({
            x: 0,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 },
        }),
        id: '1',
        Widget: {
            Render: WelcomeInit,
            Params: null,
        },
        Reload: 0,
    },
    {
        5: gridHelp.item({
            x: 0,
            y: 8,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 10 }
        }),

        10: gridHelp.item({
            x: 0,
            y: 8,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 10 }
        }),

        15: gridHelp.item({
            x: 5,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 8, h: 8 },
        }),
        20: gridHelp.item({
            x: 5,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 },
        }),
        id: '2',
        Config: {
            Draggable: true,
            Resizeable: true,
            Reloadable: true,
        },
        Widget: {
            Render: StorageDistribution,
            Params: {
                projectsList,
            },
        },
        Reload: 0,
    },
    {
        5: gridHelp.item({
            x: 0,
            y: 32,
            w: 5,
            h: 24,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 }
        }),

        10: gridHelp.item({
            x: 0,
            y: 16,
            w: 10,
            h: 12,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 }
        }),

        15: gridHelp.item({
            x: 0,
            y: 8,
            w: 10,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 12, h: 8 },
        }),
        20: gridHelp.item({
            x: 0,
            y: 8,
            w: 15,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 },
        }),
        id: '3',
        Widget: {
            Render: FileLineage,
            Params: null,
        },
        Reload: 0,
    },
    {
        5: gridHelp.item({
            x: 0,
            y: 24,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 }
        }),

        10: gridHelp.item({
            x: 5,
            y: 8,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 }
        }),

        15: gridHelp.item({
            x: 10,
            y: 8,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 18, h: 8 },
        }),
        20: gridHelp.item({
            x: 15,
            y: 0,
            w: 5,
            h: 13,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 },
        }),
        id: '4',
        Widget: {
            Render: RecentActivity,
            Params: null,
        },
        Reload: 0,
    },
    {
        5: gridHelp.item({
            x: 0,
            y: 16,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 6 }
        }),

        10: gridHelp.item({
            x: 5,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 6 }
        }),

        15: gridHelp.item({
            x: 10,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 6, h: 8 },
        }),
        20: gridHelp.item({
            x: 10,
            y: 0,
            w: 5,
            h: 8,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 },
        }),
        id: '5',
        Widget: {
            Render: BucketChecks,
            Params: {
                projectsList,
            },
        },
        Reload: 0,
    },
    {
        5: gridHelp.item({
            x: 0,
            y: 56,
            w: 5,
            h: 4,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 }
        }),

        10: gridHelp.item({
            x: 0,
            y: 28,
            w: 5,
            h: 4,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 }
        }),

        15: gridHelp.item({
            x: 0,
            y: 16,
            w: 5,
            h: 4,
            customDragger: true,
            customResizer: true,
            max: { w: 18, h: 8 },
        }),
        20: gridHelp.item({
            x: 15,
            y: 13,
            w: 5,
            h: 3,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 },
        }),
        id: '6',
        Widget: {
            Render: Tips,
            Params: null,
        },
        Reload: 0,
    }
];


// The setup when 'overview' option is selected.
type OverviewItem = {
    5: any;
    10: any;
    20: any;
    30: any;
    40: any;
    id: string;
    Config?: WidgetConfig;
    Widget: Widget;
    Reload: number;
}
export const overviewCols = [
    [600, 5],
    [900, 10],
    [1300, 20],
    [1500, 30],
    [2000, 40]
]
export let overviewItems: OverviewItem[] = [
    {
        5: gridHelp.item({
            x: 0,
            y: 0,
            w: 5,
            h: 6,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 }
        }),
        10: gridHelp.item({
            x: 0,
            y: 0,
            w: 8,
            h: 6,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 }
        }),

        20: gridHelp.item({
            x: 0,
            y: 0,
            w: 9,
            h: 5,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 }
        }),

        30: gridHelp.item({
            x: 0,
            y: 0,
            w: 9,
            h: 5,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 },
        }),
        40: gridHelp.item({
            x: 0,
            y: 0,
            w: 12,
            h: 5,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 16 },
        }),
        id: '1',
        Config: {
            Draggable: true,
            Resizeable: true,
            Reloadable: false,
        },
        Widget: {
            Render: LocData,
            Params: null,
        },
        Reload: 0,
    },
    {
        5: gridHelp.item({
            x: 0,
            y: 6,
            w: 5,
            h: 6,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 10 }
        }),
        10: gridHelp.item({
            x: 0,
            y: 6,
            w: 8,
            h: 6,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 10 }
        }),

        20: gridHelp.item({
            x: 0,
            y: 5,
            w: 9,
            h: 5,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 10 }
        }),

        30: gridHelp.item({
            x: 9,
            y: 0,
            w: 10,
            h: 5,
            customDragger: true,
            customResizer: true,
            max: { w: 8, h: 8 },
        }),
        40: gridHelp.item({
            x: 12,
            y: 0,
            w: 12,
            h: 5,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 },
        }),
        id: '2',
        Config: {
            Draggable: true,
            Resizeable: true,
            Reloadable: true,
        },
        Widget: {
            Render: Statistics,
            Params: null,
        },
        Reload: 0,
    },
    {
        5: gridHelp.item({
            x: 0,
            y: 28,
            w: 5,
            h: 14,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 }
        }),
        10: gridHelp.item({
            x: 0,
            y: 28,
            w: 6,
            h: 14,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 }
        }),

        20: gridHelp.item({
            x: 0,
            y: 16,
            w: 20,
            h: 12,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 }
        }),

        30: gridHelp.item({
            x: 0,
            y: 5,
            w: 19,
            h: 11,
            customDragger: true,
            customResizer: true,
            max: { w: 12, h: 8 },
        }),
        40: gridHelp.item({
            x: 0,
            y: 5,
            w: 24,
            h: 11,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 },
        }),
        id: '3',
        Widget: {
            Render: Graphs,
            Params: null,
        },
        Reload: 0,
    },
    {
        5: gridHelp.item({
            x: 0,
            y: 12,
            w: 5,
            h: 16,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 }
        }),
        10: gridHelp.item({
            x: 0,
            y: 12,
            w: 8,
            h: 16,
            customDragger: true,
            customResizer: true,
            max: { w: 10, h: 8 }
        }),

        20: gridHelp.item({
            x: 9,
            y: 0,
            w: 11,
            h: 16,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 }
        }),

        30: gridHelp.item({
            x: 19,
            y: 0,
            w: 11,
            h: 16,
            customDragger: true,
            customResizer: true,
            max: { w: 18, h: 8 },
        }),
        40: gridHelp.item({
            x: 24,
            y: 0,
            w: 16,
            h: 16,
            customDragger: true,
            customResizer: true,
            max: { w: 20, h: 8 },
        }),
        id: '4',
        Widget: {
            Render: Metadata,
            Params: null,
        },
        Reload: 0,
    },
];