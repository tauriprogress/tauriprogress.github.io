import constants from "tauriprogress-constants";
const defaultRealmGroup = localStorage.getItem("realmGroup") || "tauri";

const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

function getDefaultDifficulty(realmGroup) {
    return constants[realmGroup].currentContent.raids.reduce((acc, raid) => {
        for (const difficulty of raid.difficulties) {
            if (difficulty > acc) {
                acc = difficulty;
            }
        }
        return acc;
    }, 0);
}

const defaultState = {
    selected: 0,
    error: null,
    loading: false,
    filter: {
        difficulty: defaultDifficulty,
        class: "",
        spec: "",
        role: "",
        faction: "",
        realm: ""
    }
};

function raidReducer(state = defaultState, action, raids) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGE_REALMGROUP":
            return {
                ...state,
                filter: {
                    difficulty: getDefaultDifficulty(action.payload),
                    class: "",
                    spec: "",
                    role: "",
                    faction: "",
                    realm: ""
                }
            };
        case "RAID_FILTER_SET":
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
        case "RAID_FILTER_RESET":
            return { ...state, filter: defaultState.filter };
        default:
            return state;
    }
}

export default raidReducer;
