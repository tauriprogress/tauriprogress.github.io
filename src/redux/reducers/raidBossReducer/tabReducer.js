import { readTabFromUrl } from "../../../helpers";

const defaultState = {
    selectedTab: readTabFromUrl(0, 3)
};

function tabReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAIDBOSS_TAB_SELECT":
            return {
                ...state,
                selectedTab: action.payload
            };

        default:
            return state;
    }
}

export default tabReducer;
