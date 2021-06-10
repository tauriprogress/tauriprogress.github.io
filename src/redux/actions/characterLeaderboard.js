export function setCharacterLeaderboardFilter(payload) {
    return {
        type: "CHARACTER_LEADERBOARD_FILTER_SET",
        payload
    };
}

export function selectCharacterLeaderboardTab(payload) {
    return {
        type: "CHARACTER_LEADERBOARD_SELECT_TAB",
        payload
    };
}

export function setCharacterLeaderboardLoading(payload) {
    return {
        type: "CHARACTER_LEADERBOARD_LOADING_SET",
        payload
    };
}

export function setCharacterLeaderboardError(payload) {
    return {
        type: "CHARACTER_LEADERBOARD_ERROR_SET",
        payload
    };
}

export function fetchCharacterLeaderboardData(payload) {
    return {
        type: "CHARACTER_LEADERBOARD_DATA_FETCH",
        payload
    };
}

export function fillCharacterLeaderboard(payload) {
    return {
        type: "CHARACTER_LEADERBOARD_DATA_FILL",
        payload
    };
}
