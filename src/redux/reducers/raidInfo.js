import raids from "./raids";

import raidReducer from "./raidReducer";
import raidBossReducer from "./raidBossReducer";

function raidInfo(state = {}, action) {
    return {
        raids: raids(state.raids, action),
        raid: raidReducer(state.raid, action, state.raids),
        raidBoss: raidBossReducer(state.raidBoss, action, state.raids)
    };
}

export default raidInfo;
