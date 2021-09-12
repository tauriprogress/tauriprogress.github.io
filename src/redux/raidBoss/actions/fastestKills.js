export const RAIDBOSS_FASTESTKILLS_FETCH = "RAIDBOSS_FASTESTKILLS_FETCH";
export const RAIDBOSS_FASTESTKILLS_LOADING_SET =
    "RAIDBOSS_FASTESTKILLS_LOADING_SET";
export const RAIDBOSS_FASTESTKILLS_FILL = "RAIDBOSS_FASTESTKILLS_FILL";
export const RAIDBOSS_FASTESTKILLS_ERROR_SET =
    "RAIDBOSS_FASTESTKILLS_ERROR_SET";

export function raidBossFastestKillsFetch(payload) {
    return {
        type: RAIDBOSS_FASTESTKILLS_FETCH,
        payload
    };
}

export function raidBossFastestKillsSetLoading(payload) {
    return {
        type: RAIDBOSS_FASTESTKILLS_LOADING_SET,
        payload
    };
}

export function raidBossFastestKillsFill(payload) {
    return {
        type: RAIDBOSS_FASTESTKILLS_FILL,
        payload
    };
}

export function raidBossFastestKillsSetError(payload) {
    return {
        type: RAIDBOSS_FASTESTKILLS_ERROR_SET,
        payload
    };
}
