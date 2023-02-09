import * as constants from "tauriprogress-constants";

import Raid from "../components/Raid";
import Guild from "../components/Guild";
import Character from "../components/Character";
import Log from "../components/Log";
import Home from "../components/Home";
import CharacterLeaderboard from "../components/CharacterLeaderboard";
import GuildLeaderboard from "../components/GuildLeaderboard";
import NotFound from "../components/NotFound";

function getRealmgroupMatch() {
    let matchString = "(";
    for (let realmGroupname of constants.realmGroups) {
        matchString += `\\/${realmGroupname}|`;
    }

    return matchString.slice(0, -1) + ")";
}

const homeRegExp = new RegExp(`^${getRealmgroupMatch()}(/)?$`);
export const HOME_ROUTE = {
    name: "HOME",
    path: "/:realmGroupName",
    component: Home,
    exact: true,
    isCurrentRoute: () => homeRegExp.test(window.location.pathname),
};

const raidRegExp = new RegExp(`^${getRealmgroupMatch()}/raid(/)?.*$`);
export const RAID_ROUTE = {
    name: "RAID",
    path: "/:realmGroupName/raid/:raidName/:bossName?",
    component: Raid,
    exact: true,
    isCurrentRoute: (route) =>
        raidRegExp.test(route ? route : window.location.pathname),
};

const guildRegExp = new RegExp(`^${getRealmgroupMatch()}/guild(/)?.*$`);
export const GUILD_ROUTE = {
    name: "GUILD",
    path: "/:realmGroupName/guild/:guildName",
    component: Guild,
    exact: true,
    isCurrentRoute: () => guildRegExp.test(window.location.pathname),
};

const characterRegExp = new RegExp(`^${getRealmgroupMatch()}/character(/)?.*$`);
export const CHARACTER_ROUTE = {
    name: "CHARACTER",
    path: "/:realmGroupName/character/:characterName",
    component: Character,
    exact: true,
    isCurrentRoute: () => characterRegExp.test(window.location.pathname),
};

const logRegExp = new RegExp(`^${getRealmgroupMatch()}/log(/)?.*$`);
export const LOG_ROUTE = {
    name: "LOG",
    path: "/:realmGroupName/log/:logId",
    component: Log,
    exact: true,
    isCurrentRoute: () => logRegExp.test(window.location.pathname),
};

function CharacterLeaderboardWrapper() {
    return <CharacterLeaderboard />;
}
const characterLeaderboardRegExp = new RegExp(
    `^${getRealmgroupMatch()}/leaderboard/character(/)?.*$`
);
export const CHARACTER_LEADERBOARD_ROUTE = {
    name: "CHARACTER LEADERBOARD",
    path: "/:realmGroupName/leaderboard/character",
    component: CharacterLeaderboardWrapper,
    exact: true,
    isCurrentRoute: (route) =>
        characterLeaderboardRegExp.test(
            route ? route : window.location.pathname
        ),
};

function GuildLeaderboardWrapper() {
    return <GuildLeaderboard />;
}
const guildLeaderboardRegExp = new RegExp(
    `^${getRealmgroupMatch()}/leaderboard/guild(/)?.*$`
);
export const GUILD_LEADERBOARD_ROUTE = {
    name: "GUILD LEADERBOARD",
    path: "/:realmGroupName/leaderboard/guild",
    component: GuildLeaderboardWrapper,
    exact: true,
    isCurrentRoute: (route) => {
        return guildLeaderboardRegExp.test(
            route ? route : window.location.pathname
        );
    },
};

/* this should always be at the bottom of the routes array */
export const NOT_FOUND_ROUTE = {
    name: "NOT FOUND",
    path: ["/"],
    component: NotFound,
    exact: false,
    isCurrentRoute: () => undefined,
};

/* routes are matched based on order */
const ROUTES = [
    HOME_ROUTE,
    RAID_ROUTE,
    GUILD_ROUTE,
    CHARACTER_ROUTE,
    LOG_ROUTE,
    CHARACTER_LEADERBOARD_ROUTE,
    GUILD_LEADERBOARD_ROUTE,
    NOT_FOUND_ROUTE,
];

export default ROUTES;
