const defaultState = {
    data: null,
    error: null,
    loading: false,
    playerName: null,
    realm: null
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
        default:
            return state;
    }
}

export default playerReducer;
