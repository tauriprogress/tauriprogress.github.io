export function navToggle(payload) {
    return {
        type: "NAV_TOGGLE",
        payload
    };
}

export function guildsFill(payload) {
    return {
        type: "GUILDS_FILL",
        payload
    };
}

export function guildsSetError(payload) {
    return {
        type: "GUILDS_SET_ERROR",
        payload
    };
}

export function guildsSetLoading(payload) {
    return {
        type: "GUILDS_SET_LOADING",
        payload
    };
}
