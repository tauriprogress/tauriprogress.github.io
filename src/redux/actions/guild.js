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
        type: "GUILD_PROGRESSION_SELECT_BOSS",
        payload
    };
}

export function selectGuildRaid(payload) {
    return {
        type: "GUILD_PROGRESSION_SELECT_RAID",
        payload
    };
}

export function setGuildProgressionFilter(payload) {
    return {
        type: "GUILD_PROGRESSION_SET_FILTER",
        payload
    };
}
