import {
    RAIDBOSS_FASTESTKILLS_LOADING_SET,
    RAIDBOSS_FASTESTKILLS_FILL,
    RAIDBOSS_FASTESTKILLS_ERROR_SET,
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

function fastestKillsReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_SET:
        case ENVIRONMENT_REALMGROUP_CHANGED:
        case ENVIRONMENT_SEASONAL_CHANGED:
            return defaultState;

        case RAIDBOSS_FASTESTKILLS_LOADING_SET:
            return {
                ...state,
                error: undefined,
                loading: true,
            };
        case RAIDBOSS_FASTESTKILLS_FILL:
            return {
                ...state,
                error: undefined,
                loading: false,
                data: action.payload.fastestKills,
                dataSpecificationString: action.payload.dataSpecificationString,
            };
        case RAIDBOSS_FASTESTKILLS_ERROR_SET:
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

export default fastestKillsReducer;
