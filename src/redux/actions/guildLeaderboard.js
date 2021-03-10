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
