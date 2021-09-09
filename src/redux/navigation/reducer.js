import { NAVIGATION_TOGGLE, NAVIGATION_ITEM_SET } from "./actions";

export const navBreakpoint = 1000;
const defaultState = {
    open: window.innerWidth < navBreakpoint ? false : true,
    item: null
};

function navigationReducer(state = defaultState, action) {
    switch (action.type) {
        case NAVIGATION_TOGGLE:
            return {
                ...state,
                open:
                    action.payload !== undefined
                        ? action.payload
                        : state.open
                        ? false
                        : true
            };

        case NAVIGATION_ITEM_SET:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;
    }
}

export default navigationReducer;
