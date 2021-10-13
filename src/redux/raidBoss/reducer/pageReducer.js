import { RAIDBOSS_PAGE_SET } from "../actions";
import {
    RAIDFILTER_SET,
    NAVIGATION_ITEM_SET,
    RAIDBOSS_TAB_SET,
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED,
    ENVIRONMENT_SET
} from "../../actions";

const defaultState = {
    currentPage: 0
};

function pageReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_SET:
        case ENVIRONMENT_REALMGROUP_CHANGED:
        case ENVIRONMENT_SEASONAL_CHANGED:
            return defaultState;
        case RAIDBOSS_PAGE_SET:
            return {
                ...state,
                currentPage: action.payload
            };

        case RAIDBOSS_TAB_SET:
            return {
                ...state,
                currentPage: 0
            };

        case RAIDFILTER_SET:
            return {
                ...state,
                currentPage: 0
            };
        case NAVIGATION_ITEM_SET:
            return {
                ...state,
                currentPage: 0
            };

        default:
            return state;
    }
}

export default pageReducer;
