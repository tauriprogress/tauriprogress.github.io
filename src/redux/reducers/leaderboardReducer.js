import constants from "tauriprogress-constants";
import { getDefaultDifficulty } from "../../helpers";
const defaultRealmGroup = localStorage.getItem("realmGroup") || "tauri";
const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

const defaultState = {
    filter: {
        raid: constants[defaultRealmGroup].currentContent.name,
        difficulty: defaultDifficulty,
        class: "",
        spec: "",
        faction: "",
        realm: ""
    },
    loading: false,
    error: null,
    data: {}
};

function leaderboardReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGE_REALMGROUP":
            console.log(action);
            return {
                ...state,
                filter: {
                    raid: constants[action.payload].currentContent.name,
                    difficulty: getDefaultDifficulty(action.payload),
                    class: "",
                    spec: "",
                    faction: "",
                    realm: ""
                }
            };
        case "LEADERBOARD_FILTER_SET":
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

        case "LEADERBOARD_ERROR_SET":
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
        case "LEADERBOARD_LOADING_SET":
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
        case "LEADERBOARD_DATA_FILL":
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

export default leaderboardReducer;
