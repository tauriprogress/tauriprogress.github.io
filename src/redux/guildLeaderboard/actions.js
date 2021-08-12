export const GUILD_LEADERBOARD_FETCH = "GUILD_LEADERBOARD_FETCH";
export const GUILD_LEADERBOARD_LOADING_SET = "GUILD_LEADERBOARD_LOADING_SET";
export const GUILD_LEADERBOARD_FILL = "GUILD_LEADERBOARD_FILL";
export const GUILD_LEADERBOARD_ERROR_SET = "GUILD_LEADERBOARD_ERROR_SET";
export const GUILD_LEADERBOARD_FILTER_SET = "GUILD_LEADERBOARD_FILTER_SET";
export const GUILD_LEADERBOARD_TAB_SET = "GUILD_LEADERBOARD_TAB_SET";

export function guildLeaderboardFetch(payload) {
    return {
        type: GUILD_LEADERBOARD_FETCH,
        payload
    };
}

export function guildLeaderboardSetLoading(payload) {
    return {
        type: GUILD_LEADERBOARD_LOADING_SET,
        payload
    };
}

export function guildLeaderboardFill(payload) {
    return {
        type: GUILD_LEADERBOARD_FILL,
        payload
    };
}

export function guildLeaderboardSetError(payload) {
    return {
        type: GUILD_LEADERBOARD_ERROR_SET,
        payload
    };
}

export function guildLeaderboardSetFilter(payload) {
    return {
        type: GUILD_LEADERBOARD_FILTER_SET,
        payload
    };
}

export function guildLeaderboardSetTab(payload) {
    return {
        type: GUILD_LEADERBOARD_TAB_SET,
        payload
    };
}
