const defaultState = {
    filter: {
        name: "",
        class: "",
        spec: "",
        role: "",
        faction: "",
        realm: ""
    }
};

function charLadderFilterReducer(state = defaultState, action) {
    switch (action.type) {
        case "CHAR_LADDER_FILTER_SET":
            if (action.payload.filterName === "class") {
                return {
                    ...state,
                    filter: {
                        ...state.filter,
                        [action.payload.filterName]: action.payload.value,
                        spec: ""
                    }
                };
            }

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.filterName]: action.payload.value
                }
            };
        case "CHAR_LADDER_FILTER_RESET":
            return { ...state, filter: defaultState.filter };
        default:
            return state;
    }
}

export default charLadderFilterReducer;
