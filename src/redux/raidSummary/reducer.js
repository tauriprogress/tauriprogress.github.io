import {
    RAIDSUMMARY_LOADING_SET,
    RAIDSUMMARY_FILL,
    RAIDSUMMARY_ERROR_SET
} from "./actions";
import {
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED
} from "../actions";

const defaultState = {
    raidId: undefined,
    loading: false,
    error: null,
    data: undefined
};

function raidSummaryReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_REALMGROUP_CHANGED:
        case ENVIRONMENT_SEASONAL_CHANGED:
            return defaultState;
        case RAIDSUMMARY_LOADING_SET:
            return {
                ...state,
                raidId: action.payload.raidId,
                loading: action.payload.loading
            };

        case RAIDSUMMARY_FILL:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            };

        case RAIDSUMMARY_ERROR_SET:
            return {
                ...state,
                raidId: undefined,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default raidSummaryReducer;
