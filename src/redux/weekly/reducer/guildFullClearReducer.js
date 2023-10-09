import { REALM_GROUP_NAME_CHANGED } from "../../actions";
import {
    WEEKLY_GUILDFULLCLEAR_ERROR_SET,
    WEEKLY_GUILDFULLCLEAR_FILL,
    WEEKLY_GUILDFULLCLEAR_LOADING_SET,
} from "../actions/guildFullClear";

const defaultState = {
    guilds: [],
    loading: false,
    error: undefined,
};

function guildFullClearReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return defaultState;

        case WEEKLY_GUILDFULLCLEAR_LOADING_SET:
            return {
                ...state,
                error: undefined,
                loading: true,
            };

        case WEEKLY_GUILDFULLCLEAR_FILL:
            return {
                ...state,
                error: undefined,
                loading: false,
                guilds: action.payload.guilds,
            };
        case WEEKLY_GUILDFULLCLEAR_ERROR_SET:
            return {
                ...state,
                error: action.payload,
                loading: false,
                guilds: [],
            };
        default:
            return state;
    }
}

export default guildFullClearReducer;
