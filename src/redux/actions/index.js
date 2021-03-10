export function lastUpdatedFetch(payload) {
    return {
        type: "LAST_UPDATED_FETCH",
        payload
    };
}

export function additionalInfoLoading(payload) {
    return {
        type: "ADDITIONAL_INFO_LOADING",
        payload
    };
}

export function additionalInfoFill(payload) {
    return {
        type: "ADDITIONAL_INFO_FILL",
        payload
    };
}

export function additionalInfoSetError(payload) {
    return {
        type: "ADDITIONAL_INFO_SET_ERROR",
        payload
    };
}

export function themeToggle(payload) {
    return {
        type: "THEME_TOGGLE",
        payload
    };
}

export function guildsFetch(payload) {
    return {
        type: "GUILDS_FETCH",
        payload
    };
}

export function guildsLoad(payload) {
    return {
        type: "GUILDS_LOAD",
        payload
    };
}

export function guildsFill(payload) {
    return {
        type: "GUILDS_FILL",
        payload
    };
}

export function guildsSetError(payload) {
    return {
        type: "GUILDS_SET_ERROR",
        payload
    };
}

export * from "./raid";
export * from "./raidSummary";
export * from "./raidBoss";
export * from "./fightLog";
export * from "./guild";
export * from "./character";
export * from "./navigation";
export * from "./environment";
export * from "./characterLeaderboard";
