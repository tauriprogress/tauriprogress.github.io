export const HISTORY_PUSH = "HISTORY_PUSH";

export function pushToHistory(payload) {
    return {
        type: HISTORY_PUSH,
        payload
    };
}
