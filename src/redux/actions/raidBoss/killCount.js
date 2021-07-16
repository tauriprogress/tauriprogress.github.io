export function fetchRaidBossKillCount(payload) {
    return {
        type: "RAIDBOSS_KILLCOUNT_FETCH",
        payload
    };
}

export function fillRaidBossKillCount(payload) {
    return {
        type: "RAIDBOSS_KILLCOUNT_FILL",
        payload
    };
}
