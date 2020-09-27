import { combineReducers } from "redux";
import raidReducer from "./raidReducer";
import raidSummaryReducer from "./raidSummaryReducer";
import raidBossReducer from "./raidBossReducer";
import navReducer from "./navReducer";
import guildListReducer from "./guildListReducer";
import guildReducer from "./guildReducer";
// rename this to character from player
//import playerReducer from "./playerReducer";
import charLadderReducer from "./charLadderReducer";
import additionalInfoReducer from "./additionalInfoReducer";
import fightLogReducer from "./fightLogReducer";
import themesReducer from "./themesReducer";
import environmentReducer from "./environmentReducer";

export default combineReducers({
    raid: raidReducer,
    raidSummary: raidSummaryReducer,
    raidBoss: raidBossReducer,
    navigation: navReducer,
    guildList: guildListReducer,
    guild: guildReducer,
    //player: playerReducer,
    charLadder: charLadderReducer,
    additionalInfo: additionalInfoReducer,
    fightLog: fightLogReducer,
    themes: themesReducer,
    environment: environmentReducer
});
