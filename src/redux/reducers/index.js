import { combineReducers } from "redux";
import raidInfo from "./raidInfo";
import raidBossReducer from "./raidBossReducer";
import navReducer from "./navReducer";
import guildsReducer from "./guildsReducer";
import guildReducer from "./guildReducer";
import playerReducer from "./playerReducer";
import charLadderFilterReducer from "./charLadderFilterReducer";
import additionalInfoReducer from "./additionalInfoReducer";
import fightLogReducer from "./fightLogReducer";
import themesReducer from "./themesReducer";

export default combineReducers({
    raidInfo: raidInfo,
    raidBoss: raidBossReducer,
    nav: navReducer,
    guilds: guildsReducer,
    guild: guildReducer,
    player: playerReducer,
    charLadderFilter: charLadderFilterReducer,
    additionalInfo: additionalInfoReducer,
    fightLog: fightLogReducer,
    themes: themesReducer
});
