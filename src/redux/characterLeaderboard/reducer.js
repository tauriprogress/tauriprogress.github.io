import {
    CHARACTER_LEADERBOARD_LOADING_SET,
    CHARACTER_LEADERBOARD_DATA_FILL,
    CHARACTER_LEADERBOARD_ERROR_SET,
    CHARACTER_LEADERBOARD_FILTER_SET,
    CHARACTER_LEADERBOARD_TAB_SET,
    CHARACTER_LEADERBOARD_PAGE_SET,
} from "./actions";
import { REALM_GROUP_NAME_CHANGED } from "../../actions";

import constants from "tauriprogress-constants";
import {
    getDefaultDifficulty,
    getRealmGroupFromLocalStorage,
    readFiltersFromUrl,
    readTabFromUrl,
} from "../../helpers";

import { CHARACTER_LEADERBOARD_ROUTE } from "../../routes";

const defaultRealmGroup = getRealmGroupFromLocalStorage();

function getDefaultState(realmGroup) {
    return {
        filter: CHARACTER_LEADERBOARD_ROUTE.isCurrentRoute()
            ? readFiltersFromUrl(realmGroup, [
                  "raid",
                  "difficulty",
                  "class",
                  "faction",
                  "realm",
              ])
            : {
                  raid: constants[realmGroup].currentContent.name,
                  difficulty: getDefaultDifficulty(realmGroup),
                  class: "",
                  faction: "",
                  realm: "",
              },
        loading: false,
        error: undefined,
        data: undefined,
        selectedTab: readTabFromUrl(0, 1),
        itemCount: 0,
        page: 0,
    };
}

const defaultState = getDefaultState(defaultRealmGroup);

function characterLeaderboardReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return getDefaultState(action.payload);

        case CHARACTER_LEADERBOARD_LOADING_SET:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case CHARACTER_LEADERBOARD_DATA_FILL:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: action.payload.characters.map((character, index) => ({
                    ...character,
                    rank: index + 1 + state.page * 25,
                })),
                itemCount: action.payload.itemCount || 0,
            };
        case CHARACTER_LEADERBOARD_ERROR_SET:
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return {
                ...state,
                error: action.payload,
                loading: false,
                data: undefined,
                page: 0,
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
