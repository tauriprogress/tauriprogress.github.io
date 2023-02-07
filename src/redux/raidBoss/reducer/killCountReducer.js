import { RAIDBOSS_KILLCOUNT_FETCH, RAIDBOSS_KILLCOUNT_FILL } from "../actions";
import { REALM_GROUP_NAME_CHANGED } from "../../actions";

const defaultState = {
    count: 0,
    dataSpecificationString: "",
};

function killCountReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return defaultState;

        case RAIDBOSS_KILLCOUNT_FETCH:
            return {
                ...state,
                count: 0,
            };
        case RAIDBOSS_KILLCOUNT_FILL:
            return {
                ...state,
                count: action.payload.killCount,
                dataSpecificationString: action.payload.dataSpecificationString,
            };

        default:
            return state;
    }
}

export default killCountReducer;
