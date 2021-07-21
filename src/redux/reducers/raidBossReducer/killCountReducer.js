const defaultState = {
    count: 0,
    dataSpecificationString: ""
};

function killCountReducer(state = defaultState, action) {
    switch (action.type) {
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
