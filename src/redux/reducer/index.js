import { combineReducers } from "redux";

import siteInfoReducer from "../siteInfo/reducer";
import characterLeaderboardReducer from "../characterLeaderboard/reducer";
import characterReducer from "../character/reducer";
import logReducer from "../log/reducer";
import guildLeaderboardReducer from "../guildLeaderboard/reducer";
import guildListReducer from "../guildList/reducer";
import guildReducer from "../guild/reducer";
import navigationReducer from "../navigation/reducer";
import themesReducer from "../themes/reducer";
import raidFilterReducer from "../raidFilter/reducer";
import raidSummaryReducer from "../raidSummary/reducer";
import raidBossReducer from "../raidBoss/reducer";
import weeklyReducer from "../weekly/reducer";
import userReducer from "../user/reducer";

import environmentReducer from "../environment/reducer";

const createRootReducer = () =>
    combineReducers({
        siteInfo: siteInfoReducer,
        characterLeaderboard: characterLeaderboardReducer,
        character: characterReducer,
        log: logReducer,
        guildLeaderboard: guildLeaderboardReducer,
        guildList: guildListReducer,
        guild: guildReducer,
        navigation: navigationReducer,
        themes: themesReducer,
        raidFilter: raidFilterReducer,
        raidSummary: raidSummaryReducer,
        raidBoss: raidBossReducer,
        weekly: weeklyReducer,
        user: userReducer,

        environment: environmentReducer,
    });

export default createRootReducer;
