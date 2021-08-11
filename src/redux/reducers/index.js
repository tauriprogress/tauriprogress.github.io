import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import siteInfoReducer from "../siteInfo/reducer";
import characterLeaderboardReducer from "../characterLeaderboard/reducer";
import characterReducer from "../character/reducer";

import raidReducer from "./raidReducer";
import raidSummaryReducer from "./raidSummaryReducer";
import raidBossReducer from "./raidBossReducer";
import navigationReducer from "./navigationReducer";
import guildListReducer from "./guildListReducer";
import guildReducer from "./guildReducer";
import fightLogReducer from "./fightLogReducer";
import themesReducer from "./themesReducer";
import environmentReducer from "./environmentReducer";
import guildLeaderboardReducer from "./guildLeaderboardReducer";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        siteInfo: siteInfoReducer,
        characterLeaderboard: characterLeaderboardReducer,
        character: characterReducer,
        raid: raidReducer,
        raidSummary: raidSummaryReducer,
        raidBoss: raidBossReducer,
        navigation: navigationReducer,
        guildList: guildListReducer,
        guild: guildReducer,
        fightLog: fightLogReducer,
        themes: themesReducer,
        environment: environmentReducer,
        guildLeaderboard: guildLeaderboardReducer
    });

export default createRootReducer;
