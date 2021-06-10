export function selectGuildLeaderboardTab(payload) {
    return {
        type: "GUILD_LEADERBOARD_SELECT_TAB",
        payload
    };
}

export function setGuildLeaderboardFilter(payload) {
    return {
        type: "GUILD_LEADERBOARD_FILTER_SET",
        payload
    };
}

export function guildLeaderboardFetch(payload) {
    return {
        type: "GUILD_LEADERBOARD_FETCH",
        payload
    };
}

export function guildLeaderboardLoad(payload) {
    return {
        type: "GUILD_LEADERBOARD_LOAD",
        payload
    };
}

export function guildLeaderboardFill(payload) {
    return {
        type: "GUILD_LEADERBOARD_FILL",
        payload
    };
}

export function guildLeaderboardSetError(payload) {
    return {
        type: "GUILD_LEADERBOARD_SET_ERROR",
        payload
    };
}
