import { classToSpec } from "tauriprogress-constants";

const defaultState = {
    data: null,
    error: null,
    loading: false,
    raidName: null,
    bossName: null,
    selectedTab: 0,
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
            let data = action.payload;
            let playerData = {};

            for (let diff in data) {
                let stats = {
                    dps: {
                        total: 0,
                        classes: {}
                    },
                    hps: {
                        total: 0,
                        classes: {}
                    }
                };

                for (let variant of ["dps", "hps"]) {
                    playerData[variant] = {};
                    playerData[variant][diff] = [];

                    for (let charClass in classToSpec) {
                        stats[variant].classes[charClass] = {
                            total: 0,
                            specs: {}
                        };

                        for (let spec of classToSpec[charClass]) {
                            stats[variant].classes[charClass].specs[spec] = {
                                total: 0,
                                [variant]: 0,
                                avgIlvl: 0
                            };
                        }
                    }

                    for (let charKey in data[diff][variant]) {
                        let currentChar = data[diff][variant][charKey];

                        if (typeof currentChar[variant] !== "number") continue;
                        currentChar[variant] = Math.round(currentChar[variant]);
                        playerData[variant][diff].push(currentChar);

                        stats[variant].total += 1;
                        stats[variant].classes[currentChar.class].total += 1;
                        stats[variant].classes[currentChar.class].specs[
                            currentChar.spec
                        ].total += 1;

                        // CALC AVG OF SPEC (dps, hps, ilvl)
                        // FORMULA: ((CURRENTNUM - CURRENTAVG) / NEWTOTAL) + CURRENTAVG
                        stats[variant].classes[currentChar.class].specs[
                            currentChar.spec
                        ][variant] = Math.round(
                            (currentChar[variant] -
                                stats[variant].classes[currentChar.class].specs[
                                    currentChar.spec
                                ][variant]) /
                                stats[variant].classes[currentChar.class].specs[
                                    currentChar.spec
                                ].total +
                                stats[variant].classes[currentChar.class].specs[
                                    currentChar.spec
                                ][variant]
                        );

                        stats[variant].classes[currentChar.class].specs[
                            currentChar.spec
                        ].avgIlvl =
                            Math.round(
                                ((currentChar.ilvl -
                                    stats[variant].classes[currentChar.class]
                                        .specs[currentChar.spec].avgIlvl) /
                                    stats[variant].classes[currentChar.class]
                                        .specs[currentChar.spec].total +
                                    stats[variant].classes[currentChar.class]
                                        .specs[currentChar.spec].avgIlvl) *
                                    10
                            ) / 10;
                    }

                    data[diff].stats = JSON.parse(JSON.stringify(stats));
                    data[diff][variant] = playerData[variant][diff];
                    data[diff][variant].sort((a, b) => b[variant] - a[variant]);
                }
            }

            return {
                ...state,
                data: data,
                loading: false,
                error: null,
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
