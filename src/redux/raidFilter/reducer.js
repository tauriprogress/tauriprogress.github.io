import { RAIDFILTER_SET } from "./actions";
import { REALM_GROUP_NAME_CHANGED } from "../actions";

import {
    getDefaultDifficulty,
    getRealmGroupFromLocalStorage,
    readFiltersFromUrl,
} from "../../helpers";

import { RAID_ROUTE } from "../../routes";

const defaultRealmGroup = getRealmGroupFromLocalStorage();
const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

const defaultState = RAID_ROUTE.isCurrentRoute()
    ? readFiltersFromUrl(defaultRealmGroup, [
          "difficulty",
          "class",
          "faction",
          "realm",
          "role",
      ])
    : {
          difficulty: defaultDifficulty,
          class: "",
          role: "",
          faction: "",
          realm: "",
      };

function raidFilterReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return {
                difficulty: getDefaultDifficulty(action.payload),
                class: "",
                role: "",
                faction: "",
                realm: "",
            };
        case RAIDFILTER_SET:
            if (action.payload.filterName === "class") {
                return {
                    ...state,
                    [action.payload.filterName]: action.payload.value,
                };
            }

            return {
                ...state,
                [action.payload.filterName]: action.payload.value,
            };
        default:
            return state;
    }
}

export default raidFilterReducer;
