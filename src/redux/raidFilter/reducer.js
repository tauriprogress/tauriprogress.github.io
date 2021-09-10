import { RAIDFILTER_SET } from "./actions";

import {
    getDefaultDifficulty,
    getRealmGroupOfLocalStorage,
    readFiltersFromUrl
} from "../../helpers";

import { RAID_ROUTE } from "../../routes";

const defaultRealmGroup = getRealmGroupOfLocalStorage();
const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

const defaultState = RAID_ROUTE.isCurrentRoute()
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
      };

function raidFilterReducer(state = defaultState, action, raids) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGED":
            return {
                difficulty: getDefaultDifficulty(action.payload),
                class: "",
                spec: "",
                role: "",
                faction: "",
                realm: ""
            };
        case RAIDFILTER_SET:
            if (action.payload.filterName === "class") {
                return {
                    ...state,
                    [action.payload.filterName]: action.payload.value,
                    spec: ""
                };
            }

            return {
                ...state,
                [action.payload.filterName]: action.payload.value
            };
        default:
            return state;
    }
}

export default raidFilterReducer;
