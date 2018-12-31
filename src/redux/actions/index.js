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

export function raidBossFill(payload) {
    return {
        type: "RAID_BOSS_FILL",
        payload
    };
}

export function raidBossSetError(payload) {
    return {
        type: "RAID_BOSS_SET_ERROR",
        payload
    };
}

export function raidBossInitRequest(payload) {
    return {
        type: "RAID_BOSS_INIT_REQUEST",
        payload
    };
}

export function guildSetError(payload) {
    return {
        type: "GUILD_SET_ERROR",
        payload
    };
}

export function guildSetLoading(payload) {
    return {
        type: "GUILD_SET_LOADING",
        payload
    };
}

export function guildFill(payload) {
    return {
        type: "GUILD_FILL",
        payload
    };
}

export function guildSetNav(payload) {
    return {
        type: "GUILD_SET_NAV",
        payload
    };
}
