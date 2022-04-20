import {
    CHARACTER_LEADERBOARD_LOADING_SET,
    CHARACTER_LEADERBOARD_DATA_FILL,
    CHARACTER_LEADERBOARD_ERROR_SET,
    CHARACTER_LEADERBOARD_FILTER_SET,
    CHARACTER_LEADERBOARD_TAB_SET,
    CHARACTER_LEADERBOARD_PAGE_SET,
} from "./actions";
import {
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED,
    ENVIRONMENT_SET,
} from "../actions";

import constants from "tauriprogress-constants";
import {
    getDefaultDifficulty,
    getDefaultRaidName,
    getRealmGroupOfLocalStorage,
    readFiltersFromUrl,
    readTabFromUrl,
    validRaidNameOfEnv,
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
              "faction",
              "realm",
          ])
        : {
              raid: constants[defaultRealmGroup].currentContent.name,
              difficulty: defaultDifficulty,
              class: "",
              faction: "",
              realm: "",
          },
    loading: false,
    error: null,
    data: undefined,
    selectedTab: readTabFromUrl(0, 1),
    itemCount: 0,
    page: 0,
};

function characterLeaderboardReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_SET:
            return {
                ...state,
                filter: readFiltersFromUrl(
                    action.payload.realmGroup,
                    ["raid", "difficulty", "class", "faction", "realm"],
                    action.payload.location
                ),
                data: undefined,
                loading: false,
                error: null,
                page: 0,
            };
        case ENVIRONMENT_REALMGROUP_CHANGED:
            return {
                ...state,
                filter: {
                    raid: constants[action.payload.realmGroup].currentContent
                        .name,
                    difficulty: getDefaultDifficulty(action.payload.realmGroup),
                    class: "",
                    faction: "",
                    realm: "",
                },
                data: undefined,
                loading: false,
                error: null,
                page: 0,
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
                        : getDefaultRaidName(action.payload.realmGroup),
                },
                data: undefined,
                loading: false,
                error: null,
                page: 0,
            };
        case CHARACTER_LEADERBOARD_LOADING_SET:
            return {
                ...state,
                loading: true,
                error: null,
                data: undefined,
            };
        case CHARACTER_LEADERBOARD_DATA_FILL:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload.characters,
                itemCount: action.payload.itemCount || 0,
            };
        case CHARACTER_LEADERBOARD_ERROR_SET:
            if (!action.payload.error) {
                action.payload.error = "Unkown error.";
            }
            return {
                ...state,
                error: action.payload,
                data: undefined,
            };
        case CHARACTER_LEADERBOARD_FILTER_SET:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.filterName]: action.payload.value,
                },
                page: 0,
            };
        case CHARACTER_LEADERBOARD_TAB_SET:
            return { ...state, selectedTab: action.payload, page: 0 };

        case CHARACTER_LEADERBOARD_PAGE_SET:
            return { ...state, page: action.payload };

        default:
            return state;
    }
}

export default characterLeaderboardReducer;
