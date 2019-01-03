const defaultState = {
    data: {},
    error: null,
    loading: true
};

function playerReducer(state = defaultState, action) {
    switch (action.type) {
        case "PLAYER_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        case "PLAYER_SET_LOADING":
            return { ...state, loading: action.payload };
        case "PLAYER_FILL":
            return { ...state, data: action.payload, loading: false };
        default:
            return state;
    }
}

export default playerReducer;
