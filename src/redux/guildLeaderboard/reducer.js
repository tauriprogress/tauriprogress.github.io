import {
    GUILD_LEADERBOARD_LOADING_SET,
    GUILD_LEADERBOARD_FILL,
    GUILD_LEADERBOARD_ERROR_SET,
    GUILD_LEADERBOARD_FILTER_SET,
    GUILD_LEADERBOARD_TAB_SET
} from "./actions";
import { ENVIRONMENT_CHANGED } from "../actions";

import constants from "tauriprogress-constants";
import {
    getDefaultDifficulty,
    readFiltersFromUrl,
    readTabFromUrl
} from "../../helpers";

import { GUILD_LEADERBOARD_ROUTE } from "../../routes";

const defaultRealmGroup = localStorage.getItem("realmGroup") || "tauri";
const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

const defaultState = {
    filter: GUILD_LEADERBOARD_ROUTE.isCurrentRoute()
        ? readFiltersFromUrl(defaultRealmGroup, [
              "raid",
              "difficulty",
              "faction",
              "realm"
          ])
        : {
              raid: constants[defaultRealmGroup].currentContent.name,
              difficulty: defaultDifficulty,
              faction: "",
              realm: ""
          },
    data: null,
    error: null,
    loading: false,
    realmGroup: defaultRealmGroup,
    selectedTab: readTabFromUrl(0, 1)
};

function guildsReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_CHANGED:
            return {
                ...state,
                filter: {
                    raid: constants[action.payload].currentContent.name,
                    difficulty: getDefaultDifficulty(action.payload),
                    faction: "",
                    realm: ""
                },
                data: null
            };

        case GUILD_LEADERBOARD_LOADING_SET:
            return { ...state, loading: true, error: null };
        case GUILD_LEADERBOARD_FILL:
            return {
                ...state,
                data: action.payload.data,
                realmGroup: action.payload.realmGroup,
                loading: false,
                error: null
            };

        case GUILD_LEADERBOARD_ERROR_SET:
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        case GUILD_LEADERBOARD_FILTER_SET:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.filterName]: action.payload.value
                }
            };
        case GUILD_LEADERBOARD_TAB_SET:
            return { ...state, selectedTab: action.payload };

        default:
            return state;
    }
}

export default guildsReducer;
