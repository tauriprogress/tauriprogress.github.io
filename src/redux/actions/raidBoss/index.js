export function fetchRaidBoss(data) {
    return {
        type: "RAIDBOSS_FETCH",
        payload: data
    };
}

export function setRaidBossLoading(loading) {
    return {
        type: "RAIDBOSS_LOADING",
        payload: loading
    };
}

export function setRaidBossError(error) {
    return {
        type: "RAIDBOSS_SET_ERROR",
        payload: error
    };
}

export function fillRaidBoss(data) {
    return {
        type: "RAIDBOSS_FILL",
        payload: data
    };
}

export function setRaidBossTab(tab) {
    return {
        type: "RAIDBOSS_SELECT_TAB",
        payload: tab
    };
}

export * from "./killCount";
