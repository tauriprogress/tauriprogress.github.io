const defaultState = {
    filter: {
        name: "",
        class: "",
        spec: "",
        role: "",
        faction: "",
        realm: ""
    },
    pagination: {
        rowsPerPage: 50,
        currentPage: 0
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
        case "CHAR_LADDER_PAGINATION_PAGE_SET":
            return {
                ...state,
                pagination: { ...state.pagination, currentPage: action.payload }
            };
        default:
            return state;
    }
}

export default charLadderFilterReducer;
