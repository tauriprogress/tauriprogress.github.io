export const CHARACTER_LEADERBOARD_DATA_FETCH =
    "CHARACTER_LEADERBOARD_DATA_FETCH";
export const CHARACTER_LEADERBOARD_LOADING_SET =
    "CHARACTER_LEADERBOARD_LOADING_SET";
export const CHARACTER_LEADERBOARD_DATA_FILL =
    "CHARACTER_LEADERBOARD_DATA_FILL";
export const CHARACTER_LEADERBOARD_ERROR_SET =
    "CHARACTER_LEADERBOARD_ERROR_SET";
export const CHARACTER_LEADERBOARD_FILTER_SET =
    "CHARACTER_LEADERBOARD_FILTER_SET";
export const CHARACTER_LEADERBOARD_TAB_SET = "CHARACTER_LEADERBOARD_TAB_SET";
export const CHARACTER_LEADERBOARD_PAGE_SET = "CHARACTER_LEADERBOARD_PAGE_SET";
export function characterLeaderboardFetchData(payload) {
    return {
        type: CHARACTER_LEADERBOARD_DATA_FETCH,
        payload,
    };
}

export function characterLeaderboardSetLoading(payload) {
    return {
        type: CHARACTER_LEADERBOARD_LOADING_SET,
        payload,
    };
}

export function characterLeaderboardFill(payload) {
    return {
        type: CHARACTER_LEADERBOARD_DATA_FILL,
        payload,
    };
}

export function characterLeaderboardSetError(payload) {
    return {
        type: CHARACTER_LEADERBOARD_ERROR_SET,
        payload,
    };
}

export function characterLeaderboardSetFilter(payload) {
    return {
        type: CHARACTER_LEADERBOARD_FILTER_SET,
        payload,
    };
}

export function characterLeaderboardSetTab(payload) {
    return {
        type: CHARACTER_LEADERBOARD_TAB_SET,
        payload,
    };
}

export function characterLeaderboardSetPage(payload) {
    return {
        type: CHARACTER_LEADERBOARD_PAGE_SET,
        payload,
    };
}
