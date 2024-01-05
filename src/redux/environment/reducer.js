import * as cons from "tauriprogress-constants";
import { devEnv } from "../../helpers";

let constants = JSON.parse(JSON.stringify(cons));

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
            case "mistblade2":
                url = "http://localhost:3005";
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
