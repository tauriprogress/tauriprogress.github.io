export function fetchRaidBossFastestKills(payload) {
    return {
        type: "RAIDBOSS_FASTESTKILLS_FETCH",
        payload
    };
}

export function fillRaidBossFastestKills(payload) {
    return {
        type: "RAIDBOSS_FASTESTKILLS_FILL",
        payload
    };
}

export function setRaidBossFastestKillsLoading(payload) {
    return {
        type: "RAIDBOSS_FASTESTKILLS_LOADING",
        payload
    };
}

export function setRaidBossFastestKillsError(payload) {
    return {
        type: "RAIDBOSS_FASTESTKILLS_SET_ERROR",
        payload
    };
}
