import { combineReducers } from "redux";
import raids from "./raids";
import navReducer from "./navReducer";
import guildsReducer from "./guildsReducer";

export default combineReducers({
    raids: raids,
    nav: navReducer,
    guilds: guildsReducer
});
