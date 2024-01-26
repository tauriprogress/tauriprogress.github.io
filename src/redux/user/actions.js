export const USER_LOGIN_SET_ERROR = "USER_LOGIN_SET_ERROR";
export const USER_LOGIN_FETCH = "USER_LOGIN_FETCH";
export const USER_LOGIN_LOGOUT = "USER_LOGIN_LOGOUT";
export const USER_SET = "USER_SET";

export function userLoginFetch(payload) {
    return {
        type: USER_LOGIN_FETCH,
        payload,
    };
}

export function userLoginSetError(payload) {
    return {
        type: USER_LOGIN_SET_ERROR,
        payload,
    };
}

export function userSet(payload) {
    return {
        type: USER_SET,
        payload,
    };
}

export function userLoginLogout(payload) {
    return {
        type: USER_LOGIN_LOGOUT,
        payload,
    };
}