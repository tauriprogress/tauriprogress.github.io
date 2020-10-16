export const navBreakpoint = 1000;
const defaultState = {
    open: window.innerWidth < navBreakpoint ? false : true,
    selected: null
};

function navigationReducer(state = defaultState, action) {
    switch (action.type) {
        case "NAVIGATION_TOGGLE":
            return {
                ...state,
                open:
                    action.payload !== undefined
                        ? action.payload
                        : state.open
                        ? false
                        : true
            };

        case "NAVIGATION_SET_SELECTED":
            return {
                ...state,
                selected: action.payload
            };
        default:
            return state;
    }
}

export default navigationReducer;
