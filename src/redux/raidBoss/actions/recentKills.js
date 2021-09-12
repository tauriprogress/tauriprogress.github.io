export const RAIDBOSS_RECENTKILLS_FETCH = "RAIDBOSS_RECENTKILLS_FETCH";
export const RAIDBOSS_RECENTKILLS_LOADING_SET =
    "RAIDBOSS_RECENTKILLS_LOADING_SET";
export const RAIDBOSS_RECENTKILLS_FILL = "RAIDBOSS_RECENTKILLS_FILL";
export const RAIDBOSS_RECENTKILLS_ERROR_SET = "RAIDBOSS_RECENTKILLS_ERROR_SET";

export function raidBossRecentKillsFetch(payload) {
    return {
        type: RAIDBOSS_RECENTKILLS_FETCH,
        payload
    };
}

export function raidBossRecentKillsSetLoading(payload) {
    return {
        type: RAIDBOSS_RECENTKILLS_LOADING_SET,
        payload
    };
}

export function raidBossRecentKillsFill(payload) {
    return {
        type: RAIDBOSS_RECENTKILLS_FILL,
        payload
    };
}

export function raidBossRecentKillsSetError(payload) {
    return {
        type: RAIDBOSS_RECENTKILLS_ERROR_SET,
        payload
    };
}
