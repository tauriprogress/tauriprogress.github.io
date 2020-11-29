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
    }
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
        default:
            return state;
    }
}

export default leaderboardReducer;
