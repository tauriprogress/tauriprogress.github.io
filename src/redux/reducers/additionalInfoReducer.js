const defaultState = {
    lastUpdated: null,
    loading: false,
    error: null
};

function additionalInfoReducer(state = defaultState, action) {
    switch (action.type) {
        case "ADDITIONAL_INFO_SET_ERROR":
            return { ...state, error: action.payload, loading: false };
        case "ADDITIONAL_INFO_LOADING":
            return { ...state, loading: true, error: null };
        case "ADDITIONAL_INFO_FILL":
            return {
                ...state,
                lastUpdated: action.payload,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export default additionalInfoReducer;
