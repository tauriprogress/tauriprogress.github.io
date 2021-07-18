export function fetchRaidBossRecentKills(payload) {
    return {
        type: "RAIDBOSS_RECENTKILLS_FETCH",
        payload
    };
}

export function fillRaidBossRecentKills(payload) {
    return {
        type: "RAIDBOSS_RECENTKILLS_FILL",
        payload
    };
}

export function setRaidBossRecentKillsLoading(payload) {
    return {
        type: "RAIDBOSS_RECENTKILLS_LOADING",
        payload
    };
}

export function setRaidBossRecentKillsError(payload) {
    return {
        type: "RAIDBOSS_RECENTKILLS_SET_ERROR",
        payload
    };
}
