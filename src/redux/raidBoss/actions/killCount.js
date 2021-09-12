export const RAIDBOSS_KILLCOUNT_FETCH = "RAIDBOSS_KILLCOUNT_FETCH";
export const RAIDBOSS_KILLCOUNT_FILL = "RAIDBOSS_KILLCOUNT_FILL";

export function raidBossKillCountFetch(payload) {
    return {
        type: RAIDBOSS_KILLCOUNT_FETCH,
        payload
    };
}

export function raidBossKillCountFill(payload) {
    return {
        type: RAIDBOSS_KILLCOUNT_FILL,
        payload
    };
}
