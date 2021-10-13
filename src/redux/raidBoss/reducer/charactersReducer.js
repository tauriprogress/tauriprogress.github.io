import {
    RAIDBOSS_CHARACTERS_LOADING_SET,
    RAIDBOSS_CHARACTERS_FILL,
    RAIDBOSS_CHARACTERS_ERROR_SET
} from "../actions";
import {
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED,
    ENVIRONMENT_SET
} from "../../actions";

const defaultState = {
    data: null,
    loading: false,
    error: null,
    dataSpecificationString: ""
};

function charactersReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_SET:
        case ENVIRONMENT_REALMGROUP_CHANGED:
        case ENVIRONMENT_SEASONAL_CHANGED:
            return defaultState;

        case RAIDBOSS_CHARACTERS_LOADING_SET:
            return {
                ...state,
                error: null,
                loading: true,
                data: null
            };

        case RAIDBOSS_CHARACTERS_FILL:
            return {
                ...state,
                error: null,
                loading: false,
                data: {
                    characters: action.payload.characters,
                    itemCount: action.payload.itemCount
                },
                dataSpecificationString: action.payload.dataSpecificationString
            };
        case RAIDBOSS_CHARACTERS_ERROR_SET:
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

export default charactersReducer;
