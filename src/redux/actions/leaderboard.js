export function setLeaderboardFilter(payload) {
    return {
        type: "LEADERBOARD_FILTER_SET",
        payload
    };
}

export function setLeaderboardLoading(payload) {
    return {
        type: "LEADERBOARD_LOADING_SET",
        payload
    };
}

export function setLeaderboardError(payload) {
    return {
        type: "LEADERBOARD_ERROR_SET",
        payload
    };
}

export function fetchLeaderboardData(payload) {
    return {
        type: "LEADERBOARD_DATA_FETCH",
        payload
    };
}

export function fillLeaderboard(payload) {
    return {
        type: "LEADERBOARD_DATA_FILL",
        payload
    };
}
