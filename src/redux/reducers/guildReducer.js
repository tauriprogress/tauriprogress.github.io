import constants from "tauriprogress-constants";
const defaultRealmGroup = localStorage.getItem("realmGroup") || "tauri";

const defaultDifficulty = constants[
    defaultRealmGroup
].currentContent.raids.reduce((acc, raid) => {
    for (const difficulty of raid.difficulties) {
        if (difficulty < acc) {
            acc = difficulty;
        }
    }
    return acc;
}, 10);

const defaultRaidName = constants[defaultRealmGroup].currentContent.name;

const defaultBossName =
    constants[defaultRealmGroup].currentContent.raids[0].bosses[0].name;

let raids = constants[defaultRealmGroup].currentContent.raids;

const defaultState = {
    data: null,
    error: null,
    loading: false,
    guildName: null,
    realm: null,
    progressionFilter: {
        raid: defaultRaidName,
        boss: defaultBossName,
        difficulty: defaultDifficulty,
        class: "",
        spec: "",
        role: "",
        faction: "",
        realm: ""
    }
};

function guildReducer(state = defaultState, action) {
    switch (action.type) {
        case "GUILD_PROGRESSION_SELECT_BOSS": {
            return {
                ...state,
                progression: {
                    ...state.progression,
                    selectedBossName: action.payload
                }
            };
        }

        case "GUILD_PROGRESSION_SELECT_RAID": {
            return {
                ...state,
                progression: {
                    ...state.progression,
                    selectedRaidName: action.payload
                }
            };
        }

        case "GUILD_PROGRESSION_SET_FILTER": {
            if (action.payload.filterName === "raid") {
                return {
                    ...state,
                    progressionFilter: {
                        ...state.progressionFilter,
                        [action.payload.filterName]: action.payload.value,
                        boss: raids.reduce((acc, curr) => {
                            if (curr.name === action.payload.value) {
                                acc = curr.bosses[0].name;
                            }
                            return acc;
                        }, "")
                    }
                };
            }
            if (action.payload.filterName === "class") {
                return {
                    ...state,
                    progressionFilter: {
                        ...state.progressionFilter,
                        [action.payload.filterName]: action.payload.value,
                        spec: ""
                    }
                };
            }

            return {
                ...state,
                progressionFilter: {
                    ...state.progressionFilter,
                    [action.payload.filterName]: action.payload.value
                }
            };
        }

        case "GUILD_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        case "GUILD_SET_LOADING":
            return {
                ...state,
                loading: true,
                error: null,
                guildName: action.payload.guildName,
                realm: action.payload.realm
            };
        case "GUILD_FILL":
            let progression = action.payload.progression;

            for (let raid of action.payload.raids) {
                let raidName = raid.raidName;
                for (let diffKey in progression[raidName]) {
                    for (let bossKey in progression[raidName][diffKey]) {
                        let dps = [];
                        for (let charKey in progression[raidName][diffKey][
                            bossKey
                        ].dps) {
                            let currentDps =
                                progression[raidName][diffKey][bossKey].dps[
                                    charKey
                                ].dps;
                            if (typeof currentDps !== "number") continue;
                            progression[raidName][diffKey][bossKey].dps[
                                charKey
                            ].dps = Math.round(currentDps);

                            dps.push(
                                progression[raidName][diffKey][bossKey].dps[
                                    charKey
                                ]
                            );
                        }
                        progression[raidName][diffKey][bossKey].dps = dps.sort(
                            (a, b) => b.dps - a.dps
                        );
                    }
                }

                for (let diffKey in progression[raidName]) {
                    for (let bossKey in progression[raidName][diffKey]) {
                        let hps = [];
                        for (let charKey in progression[raidName][diffKey][
                            bossKey
                        ].hps) {
                            progression[raidName][diffKey][bossKey].hps[
                                charKey
                            ].hps = Math.round(
                                progression[raidName][diffKey][bossKey].hps[
                                    charKey
                                ].hps
                            );

                            hps.push(
                                progression[raidName][diffKey][bossKey].hps[
                                    charKey
                                ]
                            );
                        }
                        progression[raidName][diffKey][bossKey].hps = hps.sort(
                            (a, b) => b.hps - a.hps
                        );
                    }
                }
            }
            return {
                ...state,
                data: {
                    ...action.payload,
                    progression: progression
                },
                guildName: action.payload.guildName,
                realm: action.payload.realm,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export default guildReducer;
