export const NAVIGATION_TOGGLE = "NAVIGATION_TOGGLE";
export const NAVIGATION_ITEM_SET = "NAVIGATION_ITEM_SET";

export function navigationToggle(payload) {
    return {
        type: "NAVIGATION_TOGGLE",
        payload
    };
}

export function navigationSetItem(payload) {
    return {
        type: "NAVIGATION_ITEM_SET",
        payload
    };
}
