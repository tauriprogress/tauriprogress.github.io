import { REALM_GROUP_NAME_CHANGED } from "../../actions";
import {
    WEEKLY_CHALLENGE_ERROR_SET,
    WEEKLY_CHALLENGE_FILL,
    WEEKLY_CHALLENGE_LOADING_SET,
} from "../actions/weeklyChallenge";

const defaultState = {
    challenge: undefined,
    loading: false,
    error: undefined,
};

function weeklyChallengeReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return defaultState;

        case WEEKLY_CHALLENGE_LOADING_SET:
            return {
                ...state,
                error: undefined,
                loading: true,
            };

        case WEEKLY_CHALLENGE_FILL:
            return {
                ...state,
                error: undefined,
                loading: false,
                challenge: action.payload,
            };
        case WEEKLY_CHALLENGE_ERROR_SET:
            return {
                ...state,
                error: action.payload,
                loading: false,
                challenge: undefined,
            };
        default:
            return state;
    }
}

export default weeklyChallengeReducer;
