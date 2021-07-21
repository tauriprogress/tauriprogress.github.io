const defaultState = {
    data: null,
    loading: false,
    error: null,
    dataSpecificationString: ""
};

function fastestKillsReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAIDBOSS_FASTESTKILLS_FILL":
            return {
                ...state,
                error: null,
                loading: false,
                data: action.payload.fastestKills,
                dataSpecificationString: action.payload.dataSpecificationString
            };
        case "RAIDBOSS_FASTESTKILLS_LOADING":
            return {
                ...state,
                error: null,
                loading: true,
                data: null
            };
        case "RAIDBOSS_FASTESTKILLS_SET_ERROR":
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

export default fastestKillsReducer;
