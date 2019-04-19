const defaultState = {
    name: "",
    class: "",
    spec: "",
    faction: "",
    realm: ""
};

function charLadderFilterReducer(state = defaultState, action) {
    switch (action.type) {
        case "CHAR_LADDER_FILTER_SET":
            if (action.payload.filterName === "class") {
                return {
                    ...state,
                    [action.payload.filterName]: action.payload.value,
                    spec: ""
                };
            }

            return {
                ...state,
                [action.payload.filterName]: action.payload.value
            };
        case "CHAR_LADDER_FILTER_RESET":
            return { ...state, ...defaultState };
        default:
            return state;
    }
}

export default charLadderFilterReducer;
