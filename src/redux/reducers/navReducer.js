export const navBreakpoint = 1000;
const defaultState = {
    open: window.innerWidth < navBreakpoint ? false : true
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
