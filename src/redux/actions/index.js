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
export * from "./guild";
export * from "./navigation";
export * from "./environment";
export * from "./guildLeaderboard";
export * from "./history";
