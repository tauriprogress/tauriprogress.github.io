export function fetchGuild(payload) {
    return {
        type: "GUILD_FETCH",
        payload
    };
}

export function setGuildLoading(payload) {
    return {
        type: "GUILD_SET_LOADING",
        payload
    };
}

export function setGuildError(payload) {
    return {
        type: "GUILD_SET_ERROR",
        payload
    };
}

export function fillGuild(payload) {
    return {
        type: "GUILD_FILL",
        payload
    };
}

export function selectGuildBoss(payload) {
    return {
        type: "GUILD_SELECT_BOSS",
        payload
    };
}
