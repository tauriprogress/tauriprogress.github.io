const defaultState = {
    open: true
};

function navReducer(state = defaultState, action) {
    switch (action.type) {
        case "NAV_TOGGLE":
            return {
                ...state,
                open:
                    action.payload !== undefined
                        ? action.payload
                        : state.open
                        ? false
                        : true
            };
        default:
            return state;
    }
}

export default navReducer;
