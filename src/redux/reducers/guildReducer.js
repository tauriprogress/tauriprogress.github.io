const defaultState = {
    data: null,
    error: null,
    loading: true,
    nav: {
        active: 0
    }
};

function guildReducer(state = defaultState, action) {
    switch (action.type) {
        case "GUILD_SET_NAV":
            return { ...state, nav: { ...state.nav, active: action.payload } };
        case "GUILD_SET_ERROR":
            return { ...state, error: action.payload, loading: false };
        case "GUILD_SET_LOADING":
            return { ...state, loading: action.payload };
        case "GUILD_FILL":
            let progression = action.payload.progression;

            let dps = [];

            for (let raidKey in progression) {
                for (let bossKey in progression[raidKey]) {
                    for (let charKey in progression[raidKey][bossKey].dps) {
                        progression[raidKey][bossKey].dps[
                            charKey
                        ].dps = Math.round(
                            progression[raidKey][bossKey].dps[charKey].dps
                        );

                        dps.push(progression[raidKey][bossKey].dps[charKey]);
                    }
                    progression[raidKey][bossKey].dps = dps.sort(
                        (a, b) => b.dps - a.dps
                    );
                    dps = [];
                }
            }

            let hps = [];

            for (let raidKey in progression) {
                for (let bossKey in progression[raidKey]) {
                    for (let charKey in progression[raidKey][bossKey].hps) {
                        progression[raidKey][bossKey].hps[
                            charKey
                        ].hps = Math.round(
                            progression[raidKey][bossKey].hps[charKey].hps
                        );

                        hps.push(progression[raidKey][bossKey].hps[charKey]);
                    }
                    progression[raidKey][bossKey].hps = hps.sort(
                        (a, b) => b.hps - a.hps
                    );
                    hps = [];
                }
            }

            let guildList = [];

            for (let memberKey in action.payload.guildList) {
                guildList.push(action.payload.guildList[memberKey]);
            }

            return {
                ...state,
                data: {
                    ...action.payload,
                    progression: progression,
                    guildList: guildList.sort((a, b) => a.rank - b.rank)
                },
                loading: false
            };
        default:
            return state;
    }
}

export default guildReducer;
