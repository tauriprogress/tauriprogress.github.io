export const navBreakpoint = 1000;
const defaultState = {
    open: window.innerWidth < navBreakpoint ? false : true,
    selectedBoss: null
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
        default:
            return state;
    }
}

export default navigationReducer;
