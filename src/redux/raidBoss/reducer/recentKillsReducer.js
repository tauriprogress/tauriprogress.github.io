import {
    RAIDBOSS_RECENTKILLS_LOADING_SET,
    RAIDBOSS_RECENTKILLS_FILL,
    RAIDBOSS_RECENTKILLS_ERROR_SET,
} from "../actions";
import {
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED,
    ENVIRONMENT_SET,
} from "../../actions";

const defaultState = {
    data: undefined,
    loading: false,
    error: undefined,
    dataSpecificationString: "",
};

function recentKillsReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_SET:
        case ENVIRONMENT_REALMGROUP_CHANGED:
        case ENVIRONMENT_SEASONAL_CHANGED:
            return defaultState;

        case RAIDBOSS_RECENTKILLS_LOADING_SET:
            return {
                ...state,
                error: undefined,
                loading: true,
            };
        case RAIDBOSS_RECENTKILLS_FILL:
            return {
                ...state,
                error: undefined,
                loading: false,
                data: action.payload.recentKills,
                dataSpecificationString: action.payload.dataSpecificationString,
            };

        case RAIDBOSS_RECENTKILLS_ERROR_SET:
            return {
                ...state,
                error: action.payload,
                loading: false,
                data: undefined,
                dataSpecificationString: "",
            };

        default:
            return state;
    }
}

export default recentKillsReducer;
