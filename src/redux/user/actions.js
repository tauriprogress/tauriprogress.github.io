export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_SET_USER = "USER_SET_USER";
export const USER_SET_ERROR = "USER_LOGIN_SET_ERROR";
export const USER_SET_LOADING = "USER_SET_LOADING";

export function userLogin(payload) {
    return {
        type: USER_LOGIN,
        payload,
    };
}

export function userSetError(payload) {
    return {
        type: USER_SET_ERROR,
        payload,
    };
}

export function userSetUser(payload) {
    return {
        type: USER_SET_USER,
        payload,
    };
}

export function userLogout(payload) {
    return {
        type: USER_LOGOUT,
        payload,
    };
}

export function userSetLoading(payload) {
    return {
        type: USER_SET_LOADING,
        payload,
    };
}
