import { RAIDFILTER_SET } from "./actions";
import { ENVIRONMENT_REALMGROUP_CHANGED, ENVIRONMENT_SET } from "../actions";
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

function raidFilterReducer(state = defaultState, action, raids) {
    switch (action.type) {
        case ENVIRONMENT_SET:
            return readFiltersFromUrl(
                action.payload.realmGroup,
                ["difficulty", "class", "faction", "realm", "role"],
                action.payload.location
            );
        case ENVIRONMENT_REALMGROUP_CHANGED:
            return {
                difficulty: getDefaultDifficulty(action.payload.realmGroup),
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
