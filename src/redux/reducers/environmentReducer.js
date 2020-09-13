import dotenv from "dotenv";
import constants from "tauriprogress-constants";

dotenv.config();

const devEnv = process.env.DEV_ENV === "true" ? true : false;
const defaultRealmGroup = localStorage.getItem("realmGroup") || "tauri";
const defaultUrls = constants[defaultRealmGroup].urls;

const defaultState = {
    ...constants[defaultRealmGroup],
    realmGroup: defaultRealmGroup,
    urls: !devEnv
        ? defaultUrls
        : { ...defaultUrls, severUrl: "http://localhost:3000" }
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
