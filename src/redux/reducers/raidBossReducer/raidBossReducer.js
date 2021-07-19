import { readTabFromUrl } from "../../../helpers";

const defaultState = {
    data: null,
    error: null,
    loading: false,
    raidId: null,
    bossName: null,
    selectedTab: readTabFromUrl(0, 3),
    killCount: {
        count: 0,
        dataSpecificationString: ""
    },
    recentKills: {
        data: null,
        loading: false,
        error: null,
        dataSpecificationString: ""
    },
    fastestKills: {
        data: null,
        loading: false,
        error: null,
        dataSpecificationString: ""
    }
};

function raidBossReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGED":
            return {
                ...state,
                data: null,
                error: null,
                loading: false,
                raidId: null,
                bossName: null
            };
        case "RAIDBOSS_SELECT_TAB":
            return {
                ...state,
                selectedTab: action.payload
            };
        case "RAIDBOSS_LOADING":
            return {
                ...state,
                loading: true,
                raidId: action.payload.raidId,
                bossName: action.payload.bossName,
                error: null
            };
        case "RAIDBOSS_FILL":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };

        case "RAIDBOSS_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        case "RAIDBOSS_KILLCOUNT_FILL":
            return {
                ...state,
                killCount: {
                    count: action.payload.killCount,
                    dataSpecificationString:
                        action.payload.dataSpecificationString
                }
            };

        case "RAIDBOSS_RECENTKILLS_FILL":
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    error: null,
                    loading: false,
                    data: action.payload.recentKills,
                    dataSpecificationString:
                        action.payload.dataSpecificationString
                }
            };
        case "RAIDBOSS_RECENTKILLS_LOADING":
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    error: null,
                    loading: true,
                    data: null
                }
            };
        case "RAIDBOSS_RECENTKILLS_SET_ERROR":
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    error: action.payload,
                    loading: false,
                    data: null,
                    dataSpecificationString: ""
                }
            };

        case "RAIDBOSS_FASTESTKILLS_FILL":
            return {
                ...state,
                fastestKills: {
                    ...state.fastestKills,
                    error: null,
                    loading: false,
                    data: action.payload.fastestKills,
                    dataSpecificationString:
                        action.payload.dataSpecificationString
                }
            };
        case "RAIDBOSS_FASTESTKILLS_LOADING":
            return {
                ...state,
                fastestKills: {
                    ...state.fastestKills,
                    error: null,
                    loading: true,
                    data: null
                }
            };
        case "RAIDBOSS_FASTESTKILLS_SET_ERROR":
            return {
                ...state,
                fastestKills: {
                    ...state.fastestKills,
                    error: action.payload,
                    loading: false,
                    data: null,
                    dataSpecificationString: ""
                }
            };
        default:
            return state;
    }
}

export default raidBossReducer;
