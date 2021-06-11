import constants from "tauriprogress-constants";
import {
    getDefaultDifficulty,
    getRealmGroupOfLocalStorage,
    readFiltersFromUrl,
    readTabFromUrl
} from "../../helpers";

const defaultRealmGroup = getRealmGroupOfLocalStorage();
const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

const defaultState = {
    filter: new RegExp(/^\/leaderboard\/character.*/).test(
        window.location.pathname
    )
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
        case "ENVIRONMENT_CHANGE_REALMGROUP":
            return {
                ...state,
                filter: {
                    raid: constants[action.payload].currentContent.name,
                    difficulty: getDefaultDifficulty(action.payload),
                    class: "",
                    spec: "",
                    faction: "",
                    realm: "",
                    role: ""
                }
            };
        case "CHARACTER_LEADERBOARD_SELECT_TAB":
            return { ...state, selectedTab: action.payload };
        case "CHARACTER_LEADERBOARD_FILTER_SET":
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

        case "CHARACTER_LEADERBOARD_ERROR_SET":
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
        case "CHARACTER_LEADERBOARD_LOADING_SET":
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
        case "CHARACTER_LEADERBOARD_DATA_FILL":
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

        default:
            return state;
    }
}

export default characterLeaderboardReducer;
