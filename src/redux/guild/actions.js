export const GUILD_FETCH = "GUILD_LIST_FETCH";
export const GUILD_LOADING_SET = "GUILD_LOADING_SET";
export const GUILD_FILL = "GUILD_FILL";
export const GUILD_ERROR_SET = "GUILD_ERROR_SET";

export const GUILD_PROGRESSION_BOSS_SELECT = "GUILD_PROGRESSION_BOSS_SELECT";
export const GUILD_PROGRESSION_RAID_SELECT = "GUILD_PROGRESSION_RAID_SELECT";
export const GUILD_PROGRESSION_FILTER_SET = "GUILD_PROGRESSION_FILTER_SET";

export function guildFetch(payload) {
    return {
        type: GUILD_FETCH,
        payload
    };
}

export function guildSetLoading(payload) {
    return {
        type: GUILD_LOADING_SET,
        payload
    };
}

export function guildFill(payload) {
    return {
        type: GUILD_FILL,
        payload
    };
}

export function guildSetError(payload) {
    return {
        type: "GUILD_ERROR_SET",
        payload
    };
}

export function guildProgressionSelectBoss(payload) {
    return {
        type: GUILD_PROGRESSION_BOSS_SELECT,
        payload
    };
}

export function guildProgressionSelectRaid(payload) {
    return {
        type: GUILD_PROGRESSION_RAID_SELECT,
        payload
    };
}

export function guildProgressionSetFilter(payload) {
    return {
        type: GUILD_PROGRESSION_FILTER_SET,
        payload
    };
}
