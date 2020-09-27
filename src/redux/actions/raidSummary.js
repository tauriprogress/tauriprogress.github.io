export function fetchRaidSummary(raidId) {
    return {
        type: "RAIDSUMMARY_FETCH",
        payload: raidId
    };
}

export function setRaidSummaryLoading(loading) {
    return {
        type: "RAIDSUMMARY_LOADING",
        payload: loading
    };
}

export function setRaidSummaryError(error) {
    return {
        type: "RAIDSUMMARY_ERROR",
        payload: error
    };
}
export function fillRaidSummary(data) {
    return {
        type: "RAIDSUMMARY_FILL",
        payload: data
    };
}
