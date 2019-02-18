import raids from "./raids";

import raidReducer from "./raidReducer";

function raidInfo(state = {}, action) {
    return {
        raids: raids(state.raids, action),
        raid: raidReducer(state.raid, action, state.raids)
    };
}

export default raidInfo;
