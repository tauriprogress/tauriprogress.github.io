import { RAIDBOSS_TAB_SET } from "../actions";
import { readTabFromUrl } from "../../../helpers";
import { REALM_GROUP_NAME_CHANGED } from "../../actions";

const defaultState = {
    selectedTab: readTabFromUrl(0, 3),
};

function tabReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return {
                ...state,
                selectedTab: readTabFromUrl(0, 3),
            };
        case RAIDBOSS_TAB_SET:
            return {
                ...state,
                selectedTab: action.payload,
            };

        default:
            return state;
    }
}

export default tabReducer;
