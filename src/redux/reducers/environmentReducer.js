import constants from "tauriprogress-constants";

const devEnv = process.env.NODE_ENV === "development" ? true : false;
const defaultRealmGroup = localStorage.getItem("realmGroup") || "tauri";

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
