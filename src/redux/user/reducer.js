import {
    USER_AUTHENTICATE,
    USER_AUTHENTICATE_LOADING,
    USER_LOGIN_LOGOUT,
    USER_LOGIN_SET_ERROR,
    USER_SET,
} from "./actions";

const defaultState = {
    user: undefined,
    error: undefined,
    loading: false,
};

function loginReducer(state = defaultState, action) {
    switch (action.type) {
        case USER_LOGIN_SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case USER_SET: {
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        }

        case USER_AUTHENTICATE_LOADING: {
            return {
                ...state,
                loading: action.payload,
            };
        }

        case USER_LOGIN_LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
}

export default loginReducer;
