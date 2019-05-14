import { combineReducers } from "redux";
import raidInfo from "./raidInfo";
import raidBossReducer from "./raidBossReducer";
import navReducer from "./navReducer";
import guildsReducer from "./guildsReducer";
import guildReducer from "./guildReducer";
import playerReducer from "./playerReducer";
import charLadderReducer from "./charLadderReducer";
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
    charLadder: charLadderReducer,
    additionalInfo: additionalInfoReducer,
    fightLog: fightLogReducer,
    themes: themesReducer
});
