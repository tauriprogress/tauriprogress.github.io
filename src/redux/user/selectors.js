export function userErrorSelector(state) {
    return state.user.error;
}

export function userSelector(state) {
    return state.user.user;
}

export function userEntireSelector(state) {
    return state.user;
}
