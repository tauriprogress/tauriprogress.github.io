import {
    RAIDBOSS_CHARACTERS_LOADING_SET,
    RAIDBOSS_CHARACTERS_FILL,
    RAIDBOSS_CHARACTERS_ERROR_SET,
} from "../actions";
import { REALM_GROUP_NAME_CHANGED } from "../../actions";

const defaultState = {
    characters: undefined,
    itemCount: undefined,
    loading: false,
    error: undefined,
    dataSpecificationString: "",
};

function charactersReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return defaultState;

        case RAIDBOSS_CHARACTERS_LOADING_SET:
            return {
                ...state,
                error: undefined,
                loading: true,
            };

        case RAIDBOSS_CHARACTERS_FILL:
            return {
                ...state,
                error: undefined,
                loading: false,
                characters: action.payload.characters,
                itemCount: action.payload.itemCount,
                dataSpecificationString: action.payload.dataSpecificationString,
            };
        case RAIDBOSS_CHARACTERS_ERROR_SET:
            return {
                ...state,
                error: action.payload,
                loading: false,
                characters: undefined,
                itemCount: undefined,
                dataSpecificationString: "",
            };
        default:
            return state;
    }
}

export default charactersReducer;
