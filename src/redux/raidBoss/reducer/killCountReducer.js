import { RAIDBOSS_KILLCOUNT_FETCH, RAIDBOSS_KILLCOUNT_FILL } from "../actions";
import {
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED
} from "../../actions";

const defaultState = {
    count: 0,
    dataSpecificationString: ""
};

function killCountReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_REALMGROUP_CHANGED:
        case ENVIRONMENT_SEASONAL_CHANGED:
            return defaultState;

        case RAIDBOSS_KILLCOUNT_FETCH:
            return {
                ...state,
                count: 0
            };
        case RAIDBOSS_KILLCOUNT_FILL:
            return {
                ...state,
                count: action.payload.killCount,
                dataSpecificationString: action.payload.dataSpecificationString
            };

        default:
            return state;
    }
}

export default killCountReducer;
