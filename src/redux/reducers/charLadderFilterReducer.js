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
            return { ...state, ...action.payload };
        case "CHAR_LADDER_FILTER_RESET":
            return { ...state, ...defaultState };
        default:
            return state;
    }
}

export default charLadderFilterReducer;
