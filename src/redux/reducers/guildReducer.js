import { raids } from "tauriprogress-constants/currentContent";

const defaultState = {
    data: null,
    error: null,
    loading: false,
    guildName: null,
    realm: null,
    tab: 0,
    selectedBossName: null,
    selectedRaidName: null
};

function guildReducer(state = defaultState, action) {
    switch (action.type) {
        case "GUILD_SELECT_BOSS": {
            return { ...state, ...action.payload };
        }
        case "GUILD_SELECT_TAB":
            return { ...state, tab: action.payload };
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

            for (let raid of raids) {
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
                    progression: progression,
                    guildList: data.guildList.sort((a, b) => a.rank - b.rank)
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
