import { get, writable } from "svelte/store";

export type CallGoReq = {
    url: any;
    method: string;
    body: any;
    cookies: any
}

export type CallGoResp = {
    data: any;
    status: number;
}

export const TokensLost = writable<boolean>(false);
export const ThrottleReqs = writable<boolean>(false);

ThrottleReqs.subscribe(() => {
    console.log("ThrottleReqs : ", get(ThrottleReqs));
})

TokensLost.subscribe(() => {
    console.log("TokensLost : ", get(TokensLost));
})