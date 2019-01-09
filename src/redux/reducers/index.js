import { combineReducers } from "redux";
import raids from "./raids";
import navReducer from "./navReducer";
import guildsReducer from "./guildsReducer";
import raidReducer from "./raidReducer";
import raidBossReducer from "./raidBossReducer";
import guildReducer from "./guildReducer";
import playerReducer from "./playerReducer";
import charLadderFilterReducer from "./charLadderFilterReducer";
import additionalInfoReducer from "./additionalInfoReducer";
import fightLogReducer from "./fightLogReducer";

export default combineReducers({
    raids: raids,
    nav: navReducer,
    guilds: guildsReducer,
    guild: guildReducer,
    raid: raidReducer,
    raidBoss: raidBossReducer,
    player: playerReducer,
    charLadderFilter: charLadderFilterReducer,
    additionalInfo: additionalInfoReducer,
    fightLog: fightLogReducer
});
