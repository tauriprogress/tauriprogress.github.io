import * as cons from "tauriprogress-constants";

let constants = JSON.parse(JSON.stringify(cons));

const devEnv = process.env.NODE_ENV === "development" ? true : false;

if (devEnv) {
    for (const realmGroup of cons.realmGroups) {
        let url;
        switch (realmGroup) {
            case "tauri":
                url = "http://localhost:3001";
                break;
            case "crystalsong":
                url = "http://localhost:3002";
                break;
            case "mistblade":
                url = "http://localhost:3004";
                break;
            default:
                url = "http://localhost:3001";
                break;
        }

        constants[realmGroup].urls.server = url;
    }
}

function environmentReducer(state = constants, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default environmentReducer;
