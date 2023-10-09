export const WEEKLY_GUILDFULLCLEAR_FETCH = "WEEKLY_GUILDFULLCLEAR_FETCH";
export const WEEKLY_GUILDFULLCLEAR_LOADING_SET =
    "WEEKLY_GUILDFULLCLEAR_LOADING_SET";
export const WEEKLY_GUILDFULLCLEAR_FILL = "WEEKLY_GUILDFULLCLEAR_FILL";
export const WEEKLY_GUILDFULLCLEAR_ERROR_SET =
    "WEEKLY_GUILDFULLCLEAR_ERROR_SET";

export function weeklyGuildFullClearFetch(payload) {
    return {
        type: WEEKLY_GUILDFULLCLEAR_FETCH,
        payload,
    };
}

export function weeklGuildFullClearSetLoading(payload) {
    return {
        type: WEEKLY_GUILDFULLCLEAR_LOADING_SET,
        payload,
    };
}

export function weeklGuildFullClearFill(payload) {
    return {
        type: WEEKLY_GUILDFULLCLEAR_FILL,
        payload,
    };
}

export function weeklGuildFullClearSetError(payload) {
    return {
        type: WEEKLY_GUILDFULLCLEAR_ERROR_SET,
        payload,
    };
}
