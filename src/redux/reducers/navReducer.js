const defaultState = {
    showNav: false
};

function navReducer(state = defaultState, action) {
    switch (action.type) {
        case "TOGGLE_NAV":
            return {
                ...state,
                showNav: action.payload
                    ? action.payload
                    : state.showNav
                    ? false
                    : true
            };
        default:
            return state;
    }
}

export default navReducer;
