import { combineReducers } from "redux";

import tabReducer from "./tabReducer";
import killCountReducer from "./killCountReducer";
import fastestKillsReducer from "./fastestKillsReducer";
import recentKillsReducer from "./recentKillsReducer";
import charactersReducer from "./charactersReducer";
import pageReducer from "./pageReducer";

const raidBossReducer = combineReducers({
    tab: tabReducer,
    characters: charactersReducer,
    killCount: killCountReducer,
    fastestKills: fastestKillsReducer,
    recentKills: recentKillsReducer,
    page: pageReducer
});

export default raidBossReducer;
