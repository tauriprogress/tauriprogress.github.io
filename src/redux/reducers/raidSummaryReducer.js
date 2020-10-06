const defaultState = {
    raidId: undefined,
    loading: false,
    error: null,
    data: undefined
};

function raidSummaryReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAIDSUMMARY_LOADING":
            return {
                ...state,
                raidId: action.payload.raidId,
                loading: action.payload.loading
            };

        case "RAIDSUMMARY_ERROR":
            return {
                ...state,
                raidId: undefined,
                error: action.payload,
                loading: false
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
