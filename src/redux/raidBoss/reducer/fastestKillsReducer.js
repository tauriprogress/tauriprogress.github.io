import {
    RAIDBOSS_FASTESTKILLS_LOADING_SET,
    RAIDBOSS_FASTESTKILLS_FILL,
    RAIDBOSS_FASTESTKILLS_ERROR_SET
} from "../actions";

const defaultState = {
    data: null,
    loading: false,
    error: null,
    dataSpecificationString: ""
};

function fastestKillsReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGED":
            return defaultState;

        case RAIDBOSS_FASTESTKILLS_LOADING_SET:
            return {
                ...state,
                error: null,
                loading: true,
                data: null
            };
        case RAIDBOSS_FASTESTKILLS_FILL:
            return {
                ...state,
                error: null,
                loading: false,
                data: action.payload.fastestKills,
                dataSpecificationString: action.payload.dataSpecificationString
            };
        case RAIDBOSS_FASTESTKILLS_ERROR_SET:
            return {
                ...state,
                error: action.payload,
                loading: false,
                data: null,
                dataSpecificationString: ""
            };

        default:
            return state;
    }
}

export default fastestKillsReducer;
