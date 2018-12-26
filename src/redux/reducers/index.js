import { combineReducers } from "redux";
import raids from "./raids";
import navReducer from "./navReducer";
import guildsReducer from "./guildsReducer";
import raidReducer from "./raidReducer";

export default combineReducers({
    raids: raids,
    nav: navReducer,
    guilds: guildsReducer,
    raid: raidReducer
});
