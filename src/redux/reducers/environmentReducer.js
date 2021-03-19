import constants from "tauriprogress-constants";
import { validRealmGroup } from "../../helpers";

const devEnv = process.env.NODE_ENV === "development" ? true : false;
const realmGroupInLocalStorage = localStorage.getItem("realmGroup");
const defaultRealmGroup = validRealmGroup(realmGroupInLocalStorage)
    ? realmGroupInLocalStorage
    : "tauri";

if (devEnv) {
    for (const realmGroup of ["tauri", "crystalsong"]) {
        constants[realmGroup].urls.server =
            realmGroup === "tauri"
                ? "http://localhost:3001"
                : "http://localhost:3002";
    }
}

const defaultState = {
    ...constants[defaultRealmGroup],
    realmGroup: defaultRealmGroup
};

function environmentReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGE_REALMGROUP":
            const realmGroup = action.payload;

            localStorage.setItem("realmGroup", realmGroup);

            return {
                ...state,
                ...constants[realmGroup],
                realmGroup: realmGroup
            };
        default:
            return state;
    }
}

export default environmentReducer;
