import * as constants from "tauriprogress-constants";

import Raid from "../components/Raid";
import Guild from "../components/Guild";
import Character from "../components/Character";
import GuildList from "../components/GuildList";
import CharacterLeaderboard from "../components/CharacterLeaderboard";
import GuildLeaderboard from "../components/GuildLeaderboard";
import NotFound from "../components/NotFound";
import Weekly from "../components/Weekly";
import WeeklyChallengeVote from "../components/WeeklyChallengeVote";

import { Log } from "../components/Log";
import { LogModal } from "../components/Log/Modal";
import Login from "../components/Login";

function getRealmgroupMatch() {
    let matchString = "(";
    for (let realmGroupname of constants.realmGroups) {
        matchString += `\\/${realmGroupname}|`;
    }

    return matchString.slice(0, -1) + ")";
}

function pathWithRealmGroups(path) {
    return constants.realmGroups.map(
        (realmGroupName) => `/${realmGroupName}${path}`
    );
}

const weeklyRegExp = new RegExp(`^${getRealmgroupMatch()}(/)?$`);
export const WEEKLY_ROUTE = {
    name: "WEEKLY",
    path: "/:realmGroupName",
    component: Weekly,
    exact: true,
    isCurrentRoute: () => weeklyRegExp.test(window.location.pathname),
};

const weeklyChallengeVoteRegExp = new RegExp(
    `^${getRealmgroupMatch()}/weeklychallengevote(/)?$`
);
export const WEEKLY_CHALLENGE_VOTE_ROUTE = {
    name: "WEEKLY_CHALLENGE_VOTE",
    path: "/:realmGroupName/weeklychallengevote",
    component: WeeklyChallengeVote,
    exact: true,
    isCurrentRoute: () =>
        weeklyChallengeVoteRegExp.test(window.location.pathname),
};

const loginRegExp = new RegExp(`^${getRealmgroupMatch()}/login(/)?$`);
export const LOGIN_ROUTE = {
    name: "LOGIN",
    path: "/:realmGroupName/login",
    component: Login,
    exact: true,
    isCurrentRoute: () => loginRegExp.test(window.location.pathname),
};

const guildsRegExp = new RegExp(`^${getRealmgroupMatch()}/guilds(/)?.*$`);
export const GUILDS_ROUTE = {
    name: "GUILDS",
    path: "/:realmGroupName/guilds",
    component: GuildList,
    exact: true,
    isCurrentRoute: () => guildsRegExp.test(window.location.pathname),
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

export const LOG_MODAL_ROUTE = {
    name: "LOG",
    path: pathWithRealmGroups("/log/:logId"),
    component: LogModal,
    exact: true,
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
    LOGIN_ROUTE,
    WEEKLY_ROUTE,
    WEEKLY_CHALLENGE_VOTE_ROUTE,
    GUILDS_ROUTE,
    RAID_ROUTE,
    GUILD_ROUTE,
    CHARACTER_ROUTE,
    LOG_ROUTE,
    CHARACTER_LEADERBOARD_ROUTE,
    GUILD_LEADERBOARD_ROUTE,
    NOT_FOUND_ROUTE,
];

export default ROUTES;
