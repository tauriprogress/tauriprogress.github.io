export function changeEnvironmentRealmGroup(payload) {
    return {
        type: "ENVIRONMENT_CHANGE_REALMGROUP",
        payload
    };
}

export function changeEnvironmentSeason(payload) {
    return {
        type: "ENVIRONMENT_CHANGE_SEASON",
        payload
    };
}

export function environmentChanged(payload) {
    return {
        type: "ENVIRONMENT_CHANGED",
        payload
    };
}
