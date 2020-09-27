const defaultState = {
    loading: false,
    error: null,
    data: undefined
};

function raidSummaryReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAIDSUMMARY_LOADING":
            return {
                ...state,
                loading: action.payload
            };

        case "RAIDSUMMARY_ERROR":
            return {
                ...state,
                error: action.payload
            };

        case "RAIDSUMMARY_FILL":
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            };
        default:
            return state;
    }
}

export default raidSummaryReducer;
