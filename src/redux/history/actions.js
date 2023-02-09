export const HISTORY_PUSH = "HISTORY_PUSH";
export const QUERY_FILTER_INIT = "QUERY_FILTER_INIT";
export const QUERY_FILTER_CLOSE = "QUERY_FILTER_CLOSE";

export function pushToHistory(payload) {
    return {
        type: HISTORY_PUSH,
        payload,
    };
}

export function initFilterWithQuery(payload) {
    return {
        type: QUERY_FILTER_INIT,
        payload,
    };
}

export function closeFilterWithQuery(payload) {
    return {
        type: QUERY_FILTER_CLOSE,
        payload,
    };
}
