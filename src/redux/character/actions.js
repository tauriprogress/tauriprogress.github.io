export const CHARACTER_DATA_FETCH = "CHARACTER_DATA_FETCH";
export const CHARACTER_DATA_LOADING_SET = "CHARACTER_DATA_LOADING_SET";
export const CHARACTER_DATA_FILL = "CHARACTER_DATA_FILL";
export const CHARACTER_DATA_ERROR_SET = "CHARACTER_DATA_ERROR_SET";

export const CHARACTER_PROGRESSION_FETCH = "CHARACTER_PROGRESSION_FETCH";
export const CHARACTER_PROGRESSION_RAID_SET = "CHARACTER_PROGRESSION_RAID_SET";
export const CHARACTER_PROGRESSION_LOADING_SET =
    "CHARACTER_PROGRESSION_LOADING_SET";
export const CHARACTER_PROGRESSION_FILL = "CHARACTER_PROGRESSION_FILL";
export const CHARACTER_PROGRESSION_ERROR_SET =
    "CHARACTER_PROGRESSION_ERROR_SET";

export const CHARACTER_RECENTKILLS_FETCH = "CHARACTER_RECENTKILLS_FETCH";
export const CHARACTER_RECENTKILLS_LOADING_SET =
    "CHARACTER_RECENTKILLS_LOADING_SET";
export const CHARACTER_RECENTKILLS_FILL = "CHARACTER_RECENTKILLS_FILL";
export const CHARACTER_RECENTKILLS_ERROR_SET =
    "CHARACTER_RECENTKILLS_ERROR_SET";

export const CHARACTER_ITEMS_FETCH = "CHARACTER_ITEMS_FETCH";
export const CHARACTER_ITEMS_LOADING_SET = "CHARACTER_ITEMS_LOADING_SET";
export const CHARACTER_ITEMS_FILL = "CHARACTER_ITEMS_FILL";
export const CHARACTER_ITEMS_ERROR_SET = "CHARACTER_ITEMS_ERROR_SET";

export function characterDataFetch(payload) {
    return {
        type: CHARACTER_DATA_FETCH,
        payload
    };
}

export function characterDataSetLoading(payload) {
    return {
        type: CHARACTER_DATA_LOADING_SET,
        payload
    };
}

export function characterDataFill(payload) {
    return {
        type: CHARACTER_DATA_FILL,
        payload
    };
}

export function characterDataSetError(payload) {
    return {
        type: CHARACTER_DATA_ERROR_SET,
        payload
    };
}

export function characterProgressionFetch(payload) {
    return {
        type: CHARACTER_PROGRESSION_FETCH,
        payload
    };
}

export function characterProgressionSetRaid(payload) {
    return {
        type: CHARACTER_PROGRESSION_RAID_SET,
        payload
    };
}

export function characterProgressionSetLoading(payload) {
    return {
        type: CHARACTER_PROGRESSION_LOADING_SET,
        payload
    };
}

export function characterProgressionFill(payload) {
    return {
        type: CHARACTER_PROGRESSION_FILL,
        payload
    };
}

export function characterProgressionSetError(payload) {
    return {
        type: CHARACTER_PROGRESSION_ERROR_SET,
        payload
    };
}

export function characterRecentKillsFetch(payload) {
    return {
        type: CHARACTER_RECENTKILLS_FETCH,
        payload
    };
}

export function characterRecentKillsSetLoading(payload) {
    return {
        type: CHARACTER_RECENTKILLS_LOADING_SET,
        payload
    };
}

export function characterRecentKillsFill(payload) {
    return {
        type: CHARACTER_RECENTKILLS_FILL,
        payload
    };
}

export function characterRecentKillsSetError(payload) {
    return {
        type: CHARACTER_RECENTKILLS_ERROR_SET,
        payload
    };
}

export function characterItemsFetch(payload) {
    return {
        type: CHARACTER_ITEMS_FETCH,
        payload
    };
}

export function characterItemsSetLoading(payload) {
    return {
        type: CHARACTER_ITEMS_LOADING_SET,
        payload
    };
}

export function characterItemsFill(payload) {
    return {
        type: "CHARACTER_ITEMS_FILL",
        payload
    };
}

export function characterItemsSetError(payload) {
    return {
        type: "CHARACTER_ITEMS_ERROR_SET",
        payload
    };
}
