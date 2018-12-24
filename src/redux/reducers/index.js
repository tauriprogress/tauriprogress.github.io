import { combineReducers } from "redux";
import raids from "./raids";
import navReducer from "./navReducer";

export default combineReducers({
    raids: raids,
    nav: navReducer
});
