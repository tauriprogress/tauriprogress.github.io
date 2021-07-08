import Raid from "../components/Raid";
import Guild from "../components/Guild";
import Character from "../components/Character";
import FightLog from "../components/FightLog";
import Home from "../components/Home";
import CharacterLeaderboard from "../components/CharacterLeaderboard";
import GuildLeaderboard from "../components/GuildLeaderboard";
import NotFound from "../components/NotFound";

const homeRegExp = new RegExp(/^(\/seasonal)?(\/)?.*/);
export const HOME_ROUTE = {
    name: "HOME",
    path: ["/", "/seasonal/"],
    component: Home,
    exact: true,
    isCurrentRoute: () => homeRegExp.test(window.location.pathname)
};

const raidRegExp = new RegExp(/^(\/seasonal)?\/raid(\/)?.*/);
export const RAID_ROUTE = {
    name: "RAID",
    path: ["/raid/:raidName/:bossName?", "/seasonal/raid/:raidName/:bossName?"],
    component: Raid,
    exact: true,
    isCurrentRoute: () => raidRegExp.test(window.location.pathname)
};

const guildRegExp = new RegExp(/^(\/seasonal)?\/guild(\/)?.*/);
export const GUILD_ROUTE = {
    name: "GUILD",
    path: ["/guild/:guildName", "/seasonal/guild/:guildName"],
    component: Guild,
    exact: true,
    isCurrentRoute: () => guildRegExp.test(window.location.pathname)
};

const characterRegExp = new RegExp(/^(\/seasonal)?\/character(\/)?.*/);
export const CHARACTER_ROUTE = {
    name: "CHARACTER",
    path: ["/character/:characterName", "/seasonal/character/:characterName"],
    component: Character,
    exact: true,
    isCurrentRoute: () => characterRegExp.test(window.location.pathname)
};

const logRegExp = new RegExp(/^(\/seasonal)?\/log(\/)?.*/);
export const LOG_ROUTE = {
    name: "LOG",
    path: ["/log/:logId", "/seasonal/log/:logId"],
    component: FightLog,
    exact: true,
    isCurrentRoute: () => logRegExp.test(window.location.pathname)
};

const characterLeaderboardRegExp = new RegExp(
    /^(\/seasonal)?\/leaderboard\/character(\/)?.*/
);
export const CHARACTER_LEADERBOARD_ROUTE = {
    name: "CHARACTER LEADERBOARD",
    path: ["/leaderboard/character", "/seasonal/leaderboard/character"],
    component: CharacterLeaderboard,
    exact: true,
    isCurrentRoute: () =>
        characterLeaderboardRegExp.test(window.location.pathname)
};

const guildLeaderboardRegExp = new RegExp(/^\/leaderboard\/guild(\/)?.*/);
export const GUILD_LEADERBOARD_ROUTE = {
    name: "GUILD LEADERBOARD",
    path: ["/leaderboard/guild", "/seasonal/leaderboard/guild"],
    component: GuildLeaderboard,
    exact: true,
    isCurrentRoute: () => {
        return guildLeaderboardRegExp.test(window.location.pathname);
    }
};

/* this should always be at the bottom of the routes array*/
export const NOT_FOUND_ROUTE = {
    name: "NOT FOUND",
    path: ["/"],
    component: NotFound,
    exact: false,
    isCurrentRoute: () => undefined
};

const ROUTES = [
    HOME_ROUTE,
    RAID_ROUTE,
    GUILD_ROUTE,
    CHARACTER_ROUTE,
    LOG_ROUTE,
    CHARACTER_LEADERBOARD_ROUTE,
    GUILD_LEADERBOARD_ROUTE,
    NOT_FOUND_ROUTE
];

export default ROUTES;
