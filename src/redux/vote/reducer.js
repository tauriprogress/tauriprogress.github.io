import {
    WEEKLY_CHALLENGE_VOTE_SET,
    WEEKLY_CHALLENGE_VOTE_SET_ERROR,
    REALM_GROUP_NAME_CHANGED,
    WEEKLY_CHALLENGE_VOTE_LOADING_SET,
    USER_LOGOUT,
} from "../actions";

const defaultState = {
    loading: false,
    votes: [],
    currentVote: undefined,
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
                votes: action.payload.votes,
                currentVote: action.payload.currentVote,
                loading: false,
            };
        case WEEKLY_CHALLENGE_VOTE_SET_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        }

        case USER_LOGOUT:
            return {
                ...state,
                loading: false,
                currentVote: undefined,
                error: undefined,
            };

        default:
            return state;
    }
}

export default voteReducer;
