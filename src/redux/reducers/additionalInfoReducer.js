const defaultState = {
    lastUpdated: null,
    loading: true,
    error: null
};

function additionalInfoReducer(state = defaultState, action) {
    switch (action.type) {
        case "ADDITIONAL_INFO_SET_ERROR":
            return { ...state, error: action.payload, loading: false };
        case "ADDITIONAL_INFO_SET_LOADING":
            return { ...state, loading: action.payload };
        case "ADDITIONAL_INFO_FILL":
            return { ...state, lastUpdated: action.payload, loading: false };
        default:
            return state;
    }
}

export default additionalInfoReducer;
