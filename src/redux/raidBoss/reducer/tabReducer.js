import { RAIDBOSS_TAB_SET } from "../actions";
import { ENVIRONMENT_REALMGROUP_CHANGED, ENVIRONMENT_SET } from "../../actions";
import { readTabFromUrl } from "../../../helpers";

const defaultState = {
    selectedTab: readTabFromUrl(0, 3)
};

function tabReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_SET:
            return {
                ...state,
                selectedTab: readTabFromUrl(0, 3, action.payload.location)
            };
        case ENVIRONMENT_REALMGROUP_CHANGED:
            return defaultState;
        case RAIDBOSS_TAB_SET:
            return {
                ...state,
                selectedTab: action.payload
            };

        default:
            return state;
    }
}

export default tabReducer;
