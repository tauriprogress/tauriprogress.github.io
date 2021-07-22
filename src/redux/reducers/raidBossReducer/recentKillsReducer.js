const defaultState = {
    data: null,
    loading: false,
    error: null,
    dataSpecificationString: ""
};

function recentKillsReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGED":
            return defaultState;
        case "RAIDBOSS_RECENTKILLS_FILL":
            return {
                ...state,
                error: null,
                loading: false,
                data: action.payload.recentKills,
                dataSpecificationString: action.payload.dataSpecificationString
            };
        case "RAIDBOSS_RECENTKILLS_LOADING":
            return {
                ...state,
                error: null,
                loading: true,
                data: null
            };
        case "RAIDBOSS_RECENTKILLS_SET_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false,
                data: null,
                dataSpecificationString: ""
            };

        default:
            return state;
    }
}

export default recentKillsReducer;