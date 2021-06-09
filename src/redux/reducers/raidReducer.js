import { characterSpecToClass } from "tauriprogress-constants";
import queryString from "query-string";
import {
    getDefaultDifficulty,
    validRealmGroup,
    validDifficulty,
    validClass,
    validFaction,
    validRealm,
    validRole,
    validSpec
} from "../../helpers";

const defaultRealmGroup = validRealmGroup(localStorage.getItem("realmGroup"))
    ? localStorage.getItem("realmGroup")
    : "tauri";

const defaultDifficulty = getDefaultDifficulty(defaultRealmGroup);

const filterFromUrl = queryString.parse(window.location.search);

const defaultState = {
    selected: 0,
    error: null,
    loading: false,
    filter: {
        difficulty: validDifficulty(
            Number(filterFromUrl.difficulty),
            defaultRealmGroup
        )
            ? Number(filterFromUrl.difficulty)
            : defaultDifficulty,
        faction:
            filterFromUrl.faction !== "" &&
            validFaction(Number(filterFromUrl.faction))
                ? Number(filterFromUrl.faction)
                : "",
        class: validClass(filterFromUrl.class, defaultRealmGroup)
            ? filterFromUrl.class
            : "",
        spec:
            validClass(filterFromUrl.class, defaultRealmGroup) &&
            validSpec(filterFromUrl.spec, defaultRealmGroup) &&
            characterSpecToClass[filterFromUrl.spec] ===
                Number(filterFromUrl.class)
                ? filterFromUrl.spec
                : "",
        role: validRole(filterFromUrl.role) ? filterFromUrl.role : "",
        realm: validRealm(filterFromUrl.realm, defaultRealmGroup)
            ? filterFromUrl.realm
            : ""
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
        default:
            return state;
    }
}

export default raidReducer;
