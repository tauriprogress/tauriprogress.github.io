import { classToSpec } from "tauriprogress-constants";

const defaultState = {
    data: null,
    error: null,
    loading: false,
    raidName: null,
    bossName: null,
    selectedTab: 0,
    stats: null,
    update: {
        loading: false,
        error: null,
        wait: null
    }
};

function raidBossReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAID_BOSS_SELECT_TAB":
            return {
                ...state,
                selectedTab: action.payload
            };
        case "RAID_BOSS_LOADING":
            return {
                ...state,
                loading: true,
                raidName: action.payload.raidName,
                bossName: action.payload.bossName,
                error: null
            };
        case "RAID_BOSS_FILL":
            // CALC STATS HERE
            let data = action.payload;
            let playerData = {};
            let distribution = {
                total: 0,
                classes: {}
            };
            for (let charClass in classToSpec) {
                distribution.classes[charClass] = {
                    total: 0,
                    specs: {}
                };

                for (let spec of classToSpec[charClass]) {
                    distribution.classes[charClass].specs[spec] = 0;
                }
            }

            for (let variant of ["dps", "hps"]) {
                playerData[variant] = {};

                for (let diff in data) {
                    playerData[variant][diff] = [];
                    for (let charKey in data[diff][variant]) {
                        if (
                            typeof data[diff][variant][charKey][variant] !==
                            "number"
                        )
                            continue;
                        data[diff][variant][charKey][variant] = Math.round(
                            data[diff][variant][charKey][variant]
                        );
                        playerData[variant][diff].push(
                            data[diff][variant][charKey]
                        );

                        distribution.total += 1;
                        distribution.classes[
                            data[diff][variant][charKey].class
                        ].total += 1;
                        distribution.classes[
                            data[diff][variant][charKey].class
                        ].specs[data[diff][variant][charKey].spec] += 1;
                    }
                    data[diff][variant] = playerData[variant][diff];
                    data[diff][variant].sort((a, b) => b[variant] - a[variant]);
                }
            }

            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
                stats: distribution,
                update: {
                    loading: false,
                    error: null,
                    wait: null
                }
            };

        case "RAID_BOSS_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };

        case "RAID_BOSS_UPDATE_LOADING":
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: true,
                    error: null,
                    wait: null
                }
            };
        case "RAID_BOSS_UPDATE_SET_ERROR":
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    error: action.payload.err,
                    wait: action.payload.wait
                }
            };
        case "RAID_BOSS_UDPATE_DONE":
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    error: null,
                    wait: null
                }
            };
        default:
            return state;
    }
}

export default raidBossReducer;
