export function pushToHistory(payload) {
    return {
        type: "HISTORY_PUSH",
        payload
    };
}
export function replaceHistory(payload) {
    return {
        type: "HISTORY_REPLACE",
        payload
    };
}
