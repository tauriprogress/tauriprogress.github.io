import { combineReducers } from "redux";
import guildFullClearReducer from "./guildFullClearReducer";

const weeklyReducer = combineReducers({
    guildFullClear: guildFullClearReducer,
});

export default weeklyReducer;
