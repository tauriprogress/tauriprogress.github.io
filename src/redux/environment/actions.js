export const ENVIRONMENT_REALMGROUP_SET = "ENVIRONMENT_REALMGROUP_SET";
export const ENVIRONMENT_SEASON_TOGGLE = "ENVIRONMENT_SEASON_TOGGLE";
export const ENVIRONMENT_CHANGED = "ENVIRONMENT_CHANGED";

export function environmentSetRealmGroup(payload) {
    return {
        type: ENVIRONMENT_REALMGROUP_SET,
        payload
    };
}

export function environmentToggleSeason(payload) {
    return {
        type: ENVIRONMENT_SEASON_TOGGLE,
        payload
    };
}

export function environmentChanged(payload) {
    return {
        type: ENVIRONMENT_CHANGED,
        payload
    };
}
