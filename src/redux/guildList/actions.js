export const GUILD_LIST_FETCH = "GUILD_LIST_FETCH";
export const GUILD_LIST_LOADING_SET = "GUILD_LIST_LOADING_SET";
export const GUILD_LIST_FILL = "GUILD_LIST_FILL";
export const GUILD_LIST_ERROR_SET = "GUILD_LIST_ERROR_SET";

export function guildListFetch(payload) {
    return {
        type: GUILD_LIST_FETCH,
        payload
    };
}

export function guildListSetLoading(payload) {
    return {
        type: GUILD_LIST_LOADING_SET,
        payload
    };
}

export function guildListFill(payload) {
    return {
        type: GUILD_LIST_FILL,
        payload
    };
}

export function guildListSetError(payload) {
    return {
        type: GUILD_LIST_ERROR_SET,
        payload
    };
}
