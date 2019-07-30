import { raidName } from "tauriprogress-constants/currentContent";

const defaultState = {
    playerName: null,
    realm: null,
    data: {
        loading: false,
        error: null,
        data: null
    },
    progression: {
        loading: false,
        error: null,
        data: null,
        selectedRaid: raidName
    },
    latestKills: {
        loading: false,
        data: null,
        error: null
    }
};

function playerReducer(state = defaultState, action) {
    switch (action.type) {
        case "PLAYER_DATA_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    error: action.payload,
                    loading: false
                }
            };

        case "PLAYER_DATA_LOADING":
            return {
                ...state,
                data: { ...state.data, loading: true, error: null },
                playerName: action.payload.playerName,
                realm: action.payload.realm
            };

        case "PLAYER_DATA_FILL":
            return {
                ...state,
                data: {
                    ...state.data,
                    data: action.payload,
                    loading: false,
                    error: null
                },
                playerName: action.payload.name,
                realm: action.payload.realm,
                progression: { ...defaultState.progression }
            };

        case "PLAYER_PROGRESSION_SELECT_RAID": {
            return {
                ...state,
                progression: {
                    ...state.progression,
                    selectedRaid: action.payload
                }
            };
        }

        case "PLAYER_PROGRESSION_SET_ERROR":
            return {
                ...state,
                progression: {
                    ...state.progression,
                    error: action.payload,
                    loading: false
                }
            };

        case "PLAYER_PROGRESSION_LOADING":
            return {
                ...state,
                progression: {
                    ...state.progression,
                    loading: true,
                    error: null
                }
            };

        case "PLAYER_PROGRESSION_FILL":
            return {
                ...state,
                progression: {
                    ...state.progression,
                    data: { ...state.progression.data, ...action.payload },
                    loading: false,
                    error: null
                }
            };

        case "PLAYER_LATESTKILLS_LOADING":
            return {
                ...state,
                latestKills: {
                    ...state.latestKills,
                    loading: action.payload
                }
            };

        case "PLAYER_LATESTKILLS_SET_ERROR":
            return {
                ...state,
                latestKills: {
                    ...state.latestKills,
                    loading: false,
                    error: action.payload
                }
            };

        case "PLAYER_LATESTKILLS_FILL":
            return {
                ...state,
                latestKills: {
                    ...state.latestKills,
                    loading: false,
                    error: null,
                    data: action.payload
                }
            };

        default:
            return state;
    }
}

export default playerReducer;
