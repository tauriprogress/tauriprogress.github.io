export function fetchFightLog(payload) {
    return {
        type: "FIGHTLOG_FETCH",
        payload
    };
}

export function setFightLogError(payload) {
    return {
        type: "FIGHTLOG_SET_ERROR",
        payload
    };
}

export function setFightLogLoading(payload) {
    return {
        type: "FIGHTLOG_LOADING",
        payload
    };
}

export function fillFightLog(payload) {
    return {
        type: "FIGHTLOG_FILL",
        payload
    };
}
