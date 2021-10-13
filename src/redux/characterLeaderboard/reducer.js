import {
    CHARACTER_LEADERBOARD_LOADING_SET,
    CHARACTER_LEADERBOARD_DATA_FILL,
    CHARACTER_LEADERBOARD_ERROR_SET,
    CHARACTER_LEADERBOARD_FILTER_SET,
    CHARACTER_LEADERBOARD_TAB_SET
} from "./actions";
import {
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED,
    ENVIRONMENT_SET
} from "../actions";

import constants from "tauriprogress-constants";
import {
    getDefaultDifficulty,
    getDefaultRaidName,
    getRealmGroupOfLocalStorage,
    readFiltersFromUrl,
    readTabFromUrl,
    validRaidNameOfEnv
} from "../../helpers";

import { CHARACTER_LEADERBOARD_ROUTE } from "../../routes";

const defaultRealmGroup = getRealmGroupOfLocalStorage();
const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

const defaultState = {
    filter: CHARACTER_LEADERBOARD_ROUTE.isCurrentRoute()
        ? readFiltersFromUrl(defaultRealmGroup, [
              "raid",
              "difficulty",
              "class",
              "spec",
              "faction",
              "realm",
              "role"
          ])
        : {
              raid: constants[defaultRealmGroup].currentContent.name,
              difficulty: defaultDifficulty,
              class: "",
              spec: "",
              faction: "",
              realm: "",
              role: ""
          },
    loading: false,
    error: null,
    data: {},
    selectedTab: readTabFromUrl(0, 1)
};

function characterLeaderboardReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_SET:
            return {
                ...state,
                filter: readFiltersFromUrl(
                    action.payload.realmGroup,
                    [
                        "raid",
                        "difficulty",
                        "class",
                        "spec",
                        "faction",
                        "realm",
                        "role"
                    ],
                    action.payload.location
                ),
                data: {}
            };
        case ENVIRONMENT_REALMGROUP_CHANGED:
            return {
                ...state,
                filter: {
                    raid: constants[action.payload.realmGroup].currentContent
                        .name,
                    difficulty: getDefaultDifficulty(action.payload.realmGroup),
                    class: "",
                    spec: "",
                    faction: "",
                    realm: "",
                    role: ""
                },
                data: {}
            };

        case ENVIRONMENT_SEASONAL_CHANGED:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    raid: validRaidNameOfEnv(
                        state.filter.raid,
                        action.payload.realmGroup,
                        action.payload.isSeasonal
                    )
                        ? state.filter.raid
                        : getDefaultRaidName(action.payload.realmGroup)
                },
                data: {}
            };
        case CHARACTER_LEADERBOARD_LOADING_SET:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload]: {
                        ...state.data[action.payload],
                        error: null,
                        loading: true
                    }
                }
            };
        case CHARACTER_LEADERBOARD_DATA_FILL:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.dataId]: {
                        ...state.data[action.payload.dataId],
                        loading: false,
                        error: null,
                        ...action.payload.data
                    }
                }
            };
        case CHARACTER_LEADERBOARD_ERROR_SET:
            if (!action.payload.error) {
                action.payload.error = "Unkown error.";
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.dataId]: {
                        ...state.data[action.payload.dataId],
                        error: action.payload.error,
                        loading: false
                    }
                }
            };
        case CHARACTER_LEADERBOARD_FILTER_SET:
            if (action.payload.filterName === "class") {
                return {
                    ...state,
                    filter: {
                        ...state.filter,
                        [action.payload.filterName]: action.payload.value,
                        spec: ""
                    }
                };
            }
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.filterName]: action.payload.value
                }
            };
        case CHARACTER_LEADERBOARD_TAB_SET:
            return { ...state, selectedTab: action.payload };

        default:
            return state;
    }
}

export default characterLeaderboardReducer;
