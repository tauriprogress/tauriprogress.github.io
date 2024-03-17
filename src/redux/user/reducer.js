import {
    USER_LOGOUT,
    USER_SET_ERROR,
    USER_SET_LOADING,
    USER_SET_USER,
} from "./actions";
import { jwtDecode } from "jwt-decode";
const userToken = decodeToken();

function decodeToken() {
    const token = localStorage.getItem("user");
    try {
        const decoded = jwtDecode(token);
        return token;
    } catch (e) {
        return undefined;
    }
}

const defaultState = {
    user: userToken,
    error: undefined,
    loading: false,
};

function loginReducer(state = defaultState, action) {
    switch (action.type) {
        case USER_SET_USER: {
            localStorage.setItem("user", action.payload);

            return {
                ...state,
                user: action.payload,
                error: undefined,
                loading: false,
            };
        }

        case USER_SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case USER_LOGOUT: {
            localStorage.removeItem("user");

            return {
                ...state,
                user: undefined,
                loding: false,
            };
        }

        case USER_SET_LOADING: {
            return {
                ...state,
                loading: action.payload,
            };
        }

        default:
            return state;
    }
}

export default loginReducer;
