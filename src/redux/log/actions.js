export const LOG_FETCH = "LOG_FETCH";
export const LOG_LOADING_SET = "LOG_LOADING_SET";
export const LOG_FILL = "LOG_FILL";
export const LOG_ERROR_SET = "LOG_ERROR_SET";

export const LOG_LOOT_FETCH = "LOG_LOOT_FETCH";
export const LOG_LOOT_LOADING_SET = "LOG_LOOT_LOADING_SET";
export const LOG_LOOT_FILL = "LOG_LOOT_FILL";
export const LOG_LOOT_ERROR_SET = "LOG_LOOT_ERROR_SET";

export function logFetch(payload) {
    return {
        type: LOG_FETCH,
        payload,
    };
}

export function logSetLoading(payload) {
    return {
        type: LOG_LOADING_SET,
        payload,
    };
}

export function logFill(payload) {
    return {
        type: LOG_FILL,
        payload,
    };
}

export function logSetError(payload) {
    return {
        type: LOG_ERROR_SET,
        payload,
    };
}

export function logLootFetch(payload) {
    return {
        type: LOG_LOOT_FETCH,
        payload,
    };
}

export function logLootSetLoading(payload) {
    return {
        type: LOG_LOOT_LOADING_SET,
        payload,
    };
}

export function logLootFill(payload) {
    return {
        type: LOG_LOOT_FILL,
        payload,
    };
}

export function logLootSetError(payload) {
    return {
        type: LOG_LOOT_ERROR_SET,
        payload,
    };
}
