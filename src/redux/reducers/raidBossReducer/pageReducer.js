const defaultState = {
    currentPage: 0
};

function pageReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGED":
            return defaultState;
        case "RAIDBOSS_PAGE_SELECT":
            return {
                ...state,
                currentPage: action.payload
            };

        case "RAIDBOSS_TAB_SELECT":
            return {
                ...state,
                currentPage: 0
            };

        case "RAID_FILTER_SET":
            return {
                ...state,
                currentPage: 0
            };
        case "NAVIGATION_SET_SELECTED":
            return {
                ...state,
                currentPage: 0
            };

        default:
            return state;
    }
}

export default pageReducer;
