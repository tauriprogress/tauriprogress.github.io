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

export function raidFill(payload) {
    return {
        type: "RAID_FILL",
        payload
    };
}

export function raidSetError(payload) {
    return {
        type: "RAID_SET_ERROR",
        payload
    };
}

export function raidSetLoading(payload) {
    return {
        type: "RAID_SET_LOADING",
        payload
    };
}
