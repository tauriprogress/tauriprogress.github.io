const defaultState = {
    data: null,
    error: null,
    loading: true,
    raidName: null,
    bossName: null
};

function raidBossReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAID_BOSS_INIT_REQUEST":
            return {
                ...state,
                loading: action.payload.loading,
                raidName: action.payload.raidName,
                bossName: action.payload.bossName,
                error: null
            };
        case "RAID_BOSS_FILL":
            let data = action.payload;
            let dps = {};
            for (let diff in data) {
                dps[diff] = [];
                for (let charKey in data[diff].dps) {
                    data[diff].dps[charKey].dps = Math.round(
                        data[diff].dps[charKey].dps
                    );
                    dps[diff].push(data[diff].dps[charKey]);
                }
                data[diff].dps = dps[diff];
                data[diff].dps.sort((a, b) => b.dps - a.dps);
            }

            let hps = {};
            for (let diff in data) {
                hps[diff] = [];
                for (let charKey in data[diff].hps) {
                    data[diff].hps[charKey].hps = Math.round(
                        data[diff].hps[charKey].hps
                    );
                    hps[diff].push(data[diff].hps[charKey]);
                }
                data[diff].hps = hps[diff];
                data[diff].hps.sort((a, b) => b.hps - a.hps);
            }

            return { ...state, data: action.payload, loading: false };
        case "RAID_BOSS_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export default raidBossReducer;
