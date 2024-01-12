import { USER_LOGIN_LOGOUT, USER_LOGIN_SET_ERROR, USER_SET } from "./actions";
import cookie from "cookie";
import { jwtDecode } from "jwt-decode";

const cookies = cookie.parse(document.cookie);

const defaultUser = cookies && cookies.user ? cookies.user : undefined;
const defaultIsMember = getIsMember(defaultUser);

function getIsMember(jwtUser) {
    let defaultIsMember = false;
    try {
        const decodedUser = jwtUser && jwtDecode(jwtUser);

        defaultIsMember = decodedUser && decodedUser.isMember;

        return defaultIsMember;
    } catch (e) {
        return defaultIsMember;
    }
}

const startUpState = {
    user: defaultUser,
    isMember: defaultIsMember,
    error: undefined,
};

const defaultState = {
    user: undefined,
    isMember: false,
    error: undefined,
};

function loginReducer(state = startUpState, action) {
    switch (action.type) {
        case USER_LOGIN_SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case USER_SET: {
            return {
                ...state,
                user: action.payload,
                isMember: getIsMember(action.payload),
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
