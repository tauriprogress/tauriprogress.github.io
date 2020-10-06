export function navToggle(payload) {
    return {
        type: "NAV_TOGGLE",
        payload
    };
}

export function guildsFetch(payload) {
    return {
        type: "GUILDS_FETCH",
        payload
    };
}

export function guildsLoad(payload) {
    return {
        type: "GUILDS_LOAD",
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
export function guildSelectBoss(payload) {
    return {
        type: "GUILD_SELECT_BOSS",
        payload
    };
}

export function guildFetch(payload) {
    return {
        type: "GUILD_FETCH",
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

export function playerDataFetch(payload) {
    return {
        type: "PLAYER_DATA_FETCH",
        payload
    };
}

export function playerDataSetError(payload) {
    return {
        type: "PLAYER_DATA_SET_ERROR",
        payload
    };
}

export function playerDataLoading(payload) {
    return {
        type: "PLAYER_DATA_LOADING",
        payload
    };
}

export function playerDataFill(payload) {
    return {
        type: "PLAYER_DATA_FILL",
        payload
    };
}

export function playerProgressionFetch(payload) {
    return {
        type: "PLAYER_PROGRESSION_FETCH",
        payload
    };
}

export function playerProgressionSelectRaid(payload) {
    return {
        type: "PLAYER_PROGRESSION_SELECT_RAID",
        payload
    };
}

export function playerProgressionSetError(payload) {
    return {
        type: "PLAYER_PROGRESSION_SET_ERROR",
        payload
    };
}

export function playerProgressionLoading(payload) {
    return {
        type: "PLAYER_PROGRESSION_LOADING",
        payload
    };
}

export function playerProgressionFill(payload) {
    return {
        type: "PLAYER_PROGRESSION_FILL",
        payload
    };
}

export function playerLatestKillsLoading(payload) {
    return {
        type: "PLAYER_LATESTKILLS_LOADING",
        payload
    };
}

export function playerLatestKillsSetError(payload) {
    return {
        type: "PLAYER_LATESTKILLS_SET_ERROR",
        payload
    };
}

export function playerLatestKillsFill(payload) {
    return {
        type: "PLAYER_LATESTKILLS_FILL",
        payload
    };
}

export function playerItemsFetch(payload) {
    return {
        type: "PLAYER_ITEMS_FETCH",
        payload
    };
}

export function playerItemsLoading(payload) {
    return {
        type: "PLAYER_ITEMS_LOADING",
        payload
    };
}

export function playerItemsSetError(payload) {
    return {
        type: "PLAYER_ITEMS_SET_ERROR",
        payload
    };
}

export function playerItemsFill(payload) {
    return {
        type: "PLAYER_ITEMS_FILL",
        payload
    };
}

export function lastUpdatedFetch(payload) {
    return {
        type: "LAST_UPDATED_FETCH",
        payload
    };
}

export function additionalInfoLoading(payload) {
    return {
        type: "ADDITIONAL_INFO_LOADING",
        payload
    };
}

export function additionalInfoFill(payload) {
    return {
        type: "ADDITIONAL_INFO_FILL",
        payload
    };
}

export function additionalInfoSetError(payload) {
    return {
        type: "ADDITIONAL_INFO_SET_ERROR",
        payload
    };
}

export function themeToggle(payload) {
    return {
        type: "THEME_TOGGLE",
        payload
    };
}

export * from "./raid";
export * from "./raidSummary";
export * from "./raidBoss";
export * from "./fightLog";
