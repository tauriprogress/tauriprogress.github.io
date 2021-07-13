import {
    getDefaultDifficulty,
    getRealmGroupOfLocalStorage,
    readFiltersFromUrl
} from "../../helpers";

import { RAID_ROUTE } from "../../routes";

const defaultRealmGroup = getRealmGroupOfLocalStorage();
const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

const defaultState = {
    selected: 0,
    error: null,
    loading: false,
    filter: RAID_ROUTE.isCurrentRoute()
        ? readFiltersFromUrl(defaultRealmGroup, [
              "difficulty",
              "class",
              "spec",
              "faction",
              "realm",
              "role"
          ])
        : {
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
        case "ENVIRONMENT_CHANGED":
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
        default:
            return state;
    }
}

export default raidReducer;
