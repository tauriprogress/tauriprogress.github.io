import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import siteInfoReducer from "../siteInfo/reducer";
import characterLeaderboardReducer from "../characterLeaderboard/reducer";
import characterReducer from "../character/reducer";
import logReducer from "../log/reducer";
import guildLeaderboardReducer from "../guildLeaderboard/reducer";
import guildListReducer from "../guildList/reducer";
import guildReducer from "../guild/reducer";
import navigationReducer from "../navigation/reducer";

import raidReducer from "./raidReducer";
import raidSummaryReducer from "./raidSummaryReducer";
import raidBossReducer from "./raidBossReducer";
import themesReducer from "./themesReducer";
import environmentReducer from "./environmentReducer";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        siteInfo: siteInfoReducer,
        characterLeaderboard: characterLeaderboardReducer,
        character: characterReducer,
        log: logReducer,
        guildLeaderboard: guildLeaderboardReducer,
        guildList: guildListReducer,
        guild: guildReducer,
        navigation: navigationReducer,

        raid: raidReducer,
        raidSummary: raidSummaryReducer,
        raidBoss: raidBossReducer,
        themes: themesReducer,
        environment: environmentReducer
    });

export default createRootReducer;
