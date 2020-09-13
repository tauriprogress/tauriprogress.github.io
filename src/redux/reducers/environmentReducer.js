import constants from "tauriprogress-constants";

const devEnv = process.env.NODE_ENV === "development" ? true : false;
const defaultRealmGroup = localStorage.getItem("realmGroup") || "tauri";
const defaultUrls = constants[defaultRealmGroup].urls;
const defaultState = {
    ...constants[defaultRealmGroup],
    realmGroup: defaultRealmGroup,
    urls: !devEnv
        ? defaultUrls
        : { ...defaultUrls, server: "http://localhost:3001" }
};

function environmentReducer(state = defaultState, action) {
    switch (action.type) {
        case "CHANGE_REALM_GROUP":
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
