import { RAIDBOSS_PAGE_SET } from "../actions";
import {
    RAIDFILTER_SET,
    NAVIGATION_ITEM_SET,
    RAIDBOSS_TAB_SET,
} from "../../actions";
import { REALM_GROUP_NAME_CHANGED } from "../../actions";

const defaultState = {
    currentPage: 0,
};

function pageReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return defaultState;
        case RAIDBOSS_PAGE_SET:
            return {
                ...state,
                currentPage: action.payload,
            };

        case RAIDBOSS_TAB_SET:
            return {
                ...state,
                currentPage: 0,
            };

        case RAIDFILTER_SET:
            return {
                ...state,
                currentPage: 0,
            };
        case NAVIGATION_ITEM_SET:
            return {
                ...state,
                currentPage: 0,
            };

        default:
            return state;
    }
}

export default pageReducer;
