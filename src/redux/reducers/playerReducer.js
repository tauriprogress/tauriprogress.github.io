const defaultState = {
    data: null,
    error: null,
    loading: false,
    playerName: null,
    realm: null,
    latestKills: {
        loading: false,
        data: null,
        error: null
    }
};

function playerReducer(state = defaultState, action) {
    switch (action.type) {
        case "PLAYER_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        case "PLAYER_LOADING":
            return {
                ...state,
                loading: true,
                error: null,
                playerName: action.payload.playerName,
                realm: action.payload.realm
            };
        case "PLAYER_FILL":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
                playerName: action.payload.name,
                realm: action.payload.realm
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
