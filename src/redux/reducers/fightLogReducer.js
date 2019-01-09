const defaultState = {
    data: null,
    error: null,
    loading: true
};

function fightLogReducer(state = defaultState, action) {
    switch (action.type) {
        case "FIGHT_LOG_SET_ERROR":
            return { ...state, error: action.payload, loading: false };
        case "FIGHT_LOG_SET_LOADING":
            return { ...state, loading: action.payload };
        case "FIGHT_LOG_FILL":
            return { ...state, data: action.payload, loading: false };
        default:
            return state;
    }
}

export default fightLogReducer;
