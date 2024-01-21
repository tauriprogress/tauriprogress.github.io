import {
    WEEKLY_CHALLENGE_VOTE_SET,
    WEEKLY_CHALLENGE_VOTE_SET_ERROR,
    REALM_GROUP_NAME_CHANGED,
    WEEKLY_CHALLENGE_VOTE_LOADING_SET,
} from "../actions";

const defaultState = {
    loading: false,
    votes: [],
    error: undefined,
};

function voteReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return defaultState;
        case WEEKLY_CHALLENGE_VOTE_LOADING_SET:
            return {
                ...state,
                loading: action.payload,
            };
        case WEEKLY_CHALLENGE_VOTE_SET:
            return {
                ...state,
                votes: action.payload,
                loading: false,
            };
        case WEEKLY_CHALLENGE_VOTE_SET_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        }

        default:
            return state;
    }
}

export default voteReducer;
