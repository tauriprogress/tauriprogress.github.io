export * from "./history/actions";
export * from "./realmGroupName/actions";
export * from "./siteInfo/actions";
export * from "./characterLeaderboard/actions";
export * from "./character/actions";
export * from "./log/actions";
export * from "./guildLeaderboard/actions";
export * from "./guildList/actions";
export * from "./guild/actions";
export * from "./navigation/actions";
export * from "./themes/actions";
export * from "./raidFilter/actions";
export * from "./raidSummary/actions";
export * from "./raidBoss/actions";
export * from "./weekly/actions";
export * from "./user/actions";
export * from "./vote/actions";

export const APP_INIT = "APP_INIT"


export function initalizeApp(payload) {
    return {
        type: APP_INIT,
        payload
    }
}
