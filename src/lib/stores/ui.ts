import { browser } from "$app/environment";
import { get, writable, type Writable } from "svelte/store";
import { refreshSidebar } from "./lens-global";

import { type LakeDetails } from "$lib/types/global.ts";

// NOTE: Things have changed completely from the writing of the comments here. 
// Don't refer to them.

// For the UI actionables and their corresponding components and arguments.


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// The base structure:

/*
    Component: should accept {active, state} as props, atleast.
    Components are to not use stores directly, and everything dynamic is to be passed as props only.
*/

/*
    Base: should pass {activeVar, $uiState.xyz} to the component.
    Note that {activeVar} is the writable object itself and everything else is a snapshot.
*/

/*
    Initiator: should update uiState.xyz object for props, whenDone, etc.
    Only then should it set the {activeVar} to true.
*/

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/*  Add new components props object and the writable active boolean here. 
   
    The props can have any number of arguments, and are passed as it is to the component, as the 
    {state} prop.
    Any other custom implementation needs should be passed through these props only.
    The active boolean is passed as the {active} prop and should be bound to the components root 
    {open} tag.
*/

// ************************************************************************************************
// For the AddLocations dialog box component.
export type AddLocsProps = {
    LakeID: number;
    Locations: any;
    WhenLocsAdded: any;
}
export const AddLocsDialogActive: Writable<boolean> = writable(false);
export const AddLocsDialogState = writable<ComponentState<AddLocsProps>>({
    Props: {
        LakeID: 0,
        Locations: [],
        WhenLocsAdded: null,
    },
    WhenDone: null,
})
// ************************************************************************************************
// For any confirmation dialog, with an 'action' and a 'cancel' choice
export type ActionDialogProps = {
    Title: string;
    Description: string;
    OnAction: any;
    ActionBtnTxt: string;
    OnCancel: any;
}
export const ActionDialogActive: Writable<boolean> = writable(false);
export const ActionDialogState = writable<ComponentState<ActionDialogProps>>({
    Props: {
        Title: '',
        Description: '',
        OnAction: null,
        ActionBtnTxt: '',
        OnCancel: null,
    },
    WhenDone: null,
});
// ************************************************************************************************
// For the lake details dialog box
export type LakeDetailsDialogProps = {
    Details: LakeDetails;
}
export const LakeDetailsDialogActive: Writable<boolean> = writable(false);
export const LakeDetailsDialogState = writable<ComponentState<LakeDetailsDialogProps>>({
    Props: {
        Details: {
            LakeID: 0,
            Name: '',
            Ptype: '',
            CreatedAt: '',
            Region: ''
        },
    },
    WhenDone: null,
})
// ************************************************************************************************
// For the main area content
export type MainAreaGridProps = {
    Metadata: {
        Title: string;
        Columns: any;
        Data: any;
    }
}

export const MainAreaGridActive: Writable<boolean> = writable(true);
export const MainAreaGridState = writable<ComponentState<MainAreaGridProps>>({
    Props: {
        Metadata: {
            Title: '',
            Columns: null,
            Data: null,
        }
    },
    WhenDone: null,
})
// ************************************************************************************************





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


/*
    The state object for each component. This is where all the data lives.

    Props: the arguments object defined earlier.
    WhenDone: the function that is called at the very end of the components life.
    We cannot guarantee the call as it is dependent on the components implementation.
    Also exits before life completion will mostly not call this.
*/

export type ComponentState<T> = {
    Props: T;
    WhenDone: any;
}

// ************************************************************************************************



// ************************************************************************************************


/*
    After defining the {Props} above, it is to be added here, in {uiState}.

    Special care has to be taken to make sure every defined object is added,
    until checks are being developed.
*/


// ************************************************************************************************


/*
    After defining the {activeVar} above, it is to be added here, in {uiActive}.

    Special care has to be taken to make sure every defined object is added,
    until checks are being developed.
*/

// Use this when you want to run functions when global active state changes.
export type toRun = {
    State: boolean; // the {Func} is only run when {State} == {get(activeVar)}.
    Debounce: number; // the number of times to ignore on load.
    Func: any; // the function to run, the state is passed as a param.
}

export type ActiveUIType = {
    ActiveVar: Writable<boolean>; // the {activeVar} to track.
    ToRun: toRun[];
}

// The array collection of all the active boolean objects.
export const uiActive: ActiveUIType[] = [
    {
        ActiveVar: AddLocsDialogActive,
        ToRun: [
            {
                State: false,
                Debounce: 1,
                Func: refreshSidebar,
            },
        ]
    },
    {
        ActiveVar: ActionDialogActive,
        ToRun: [],
    }
];





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// The helper, cleaner, etc functions


if (browser) {
    uiActive.forEach(ui => {
        ui.ActiveVar.subscribe(() => {
            ui.ToRun.forEach(torun => {
                torun.Debounce--;
                if (torun.Debounce >= 0) return;
                if (get(ui.ActiveVar) == torun.State) {
                    torun.Func?.(torun.State);
                }
            });
        })
    });
}




