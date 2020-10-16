export function toggleNavigation(payload) {
    return {
        type: "NAVIGATION_TOGGLE",
        payload
    };
}

export function setSelectedNavigationItem(payload) {
    return {
        type: "NAVIGATION_SET_SELECTED",
        payload
    };
}
