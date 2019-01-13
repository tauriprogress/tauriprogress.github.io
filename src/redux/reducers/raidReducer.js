const defaultState = {
    data: null,
    error: null,
    loading: false
};

function raidReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAID_LOADING":
            return { ...state, loading: true, error: null };
        case "RAID_FILL":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };
        case "RAID_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export default raidReducer;
