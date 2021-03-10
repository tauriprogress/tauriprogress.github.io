import { combineReducers } from "redux";
import raidReducer from "./raidReducer";
import raidSummaryReducer from "./raidSummaryReducer";
import raidBossReducer from "./raidBossReducer";
import navigationReducer from "./navigationReducer";
import guildListReducer from "./guildListReducer";
import guildReducer from "./guildReducer";
import characterReducer from "./characterReducer";
import charLadderReducer from "./charLadderReducer";
import additionalInfoReducer from "./additionalInfoReducer";
import fightLogReducer from "./fightLogReducer";
import themesReducer from "./themesReducer";
import environmentReducer from "./environmentReducer";
import characterLeaderboardReducer from "./characterLeaderboardReducer";
import guildLeaderboardReducer from "./guildLeaderboardReducer";

export default combineReducers({
    raid: raidReducer,
    raidSummary: raidSummaryReducer,
    raidBoss: raidBossReducer,
    navigation: navigationReducer,
    guildList: guildListReducer,
    guild: guildReducer,
    character: characterReducer,
    charLadder: charLadderReducer,
    additionalInfo: additionalInfoReducer,
    fightLog: fightLogReducer,
    themes: themesReducer,
    environment: environmentReducer,
    characterLeaderboard: characterLeaderboardReducer,
    guildLeaderboard: guildLeaderboardReducer
});
