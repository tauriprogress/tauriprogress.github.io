import {
    GUILD_LEADERBOARD_LOADING_SET,
    GUILD_LEADERBOARD_FILL,
    GUILD_LEADERBOARD_ERROR_SET,
    GUILD_LEADERBOARD_FILTER_SET,
    GUILD_LEADERBOARD_TAB_SET,
} from "./actions";
import { REALM_GROUP_NAME_CHANGED } from "../../actions";

import constants from "tauriprogress-constants";
import {
    getDefaultDifficulty,
    readFiltersFromUrl,
    readTabFromUrl,
    getRealmGroupFromLocalStorage,
} from "../../helpers";

import { GUILD_LEADERBOARD_ROUTE } from "../../routes";

const defaultRealmGroup = getRealmGroupFromLocalStorage();

function getDefaultState(realmGroup) {
    return {
        filter: GUILD_LEADERBOARD_ROUTE.isCurrentRoute()
            ? readFiltersFromUrl(realmGroup, [
                  "raid",
                  "difficulty",
                  "faction",
                  "realm",
              ])
            : {
                  raid: constants[realmGroup].currentContent.name,
                  difficulty: getDefaultDifficulty(realmGroup),
                  faction: "",
                  realm: "",
              },
        data: undefined,
        error: undefined,
        loading: false,
        realmGroup: realmGroup,
        selectedTab: readTabFromUrl(0, 1),
    };
}

const defaultState = getDefaultState(defaultRealmGroup);

function guildLeaderboardReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return getDefaultState(action.payload);
        case GUILD_LEADERBOARD_LOADING_SET:
            return { ...state, loading: true, error: undefined };
        case GUILD_LEADERBOARD_FILL:
            return {
                ...state,
                data: action.payload.data,
                realmGroup: action.payload.realmGroup,
                loading: false,
                error: undefined,
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
                    [action.payload.filterName]: action.payload.value,
                },
            };
        case GUILD_LEADERBOARD_TAB_SET:
            return { ...state, selectedTab: action.payload };

        default:
            return state;
    }
}

export default guildLeaderboardReducer;
