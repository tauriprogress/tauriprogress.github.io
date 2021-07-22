const defaultState = {
    count: 0,
    dataSpecificationString: ""
};

function killCountReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGED":
            return defaultState;
        case "RAIDBOSS_KILLCOUNT_FILL":
            return {
                ...state,
                count: action.payload.killCount,
                dataSpecificationString: action.payload.dataSpecificationString
            };

        default:
            return state;
    }
}

export default killCountReducer;
