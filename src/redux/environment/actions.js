export const ENVIRONMENT_SET = "ENVIRONMENT_SET";
export const ENVIRONMENT_REALMGROUP_SET = "ENVIRONMENT_REALMGROUP_SET";
export const ENVIRONMENT_SEASON_TOGGLE = "ENVIRONMENT_SEASON_TOGGLE";
export const ENVIRONMENT_REALMGROUP_CHANGED = "ENVIRONMENT_REALMGROUP_CHANGED";
export const ENVIRONMENT_SEASONAL_CHANGED = "ENVIRONMENT_SEASONAL_CHANGED";

export function environmentSetEnvironment(payload) {
    return {
        type: ENVIRONMENT_SET,
        payload
    };
}

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

export function environmentRealmGroupChanged(payload) {
    return {
        type: ENVIRONMENT_REALMGROUP_CHANGED,
        payload
    };
}

export function environmentSeasonalChanged(payload) {
    return {
        type: ENVIRONMENT_SEASONAL_CHANGED,
        payload
    };
}
