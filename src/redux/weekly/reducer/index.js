import { combineReducers } from "redux";
import guildFullClearReducer from "./guildFullClearReducer";
import weeklyChallengeReducer from "./weeklyChallengeReducer";

const weeklyReducer = combineReducers({
    guildFullClear: guildFullClearReducer,
    weeklyChallenge: weeklyChallengeReducer,
});

export default weeklyReducer;
