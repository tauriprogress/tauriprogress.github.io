const defaultRealmGroup = localStorage.getItem("realmGroup") || "tauri";

const defaultState = {
    data: null,
    error: null,
    loading: false,
    realmGroup: defaultRealmGroup
};

function guildsReducer(state = defaultState, action) {
    switch (action.type) {
        case "GUILD_LEADERBOARD_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        case "GUILD_LEADERBOARD_LOAD":
            return { ...state, loading: true, error: null };
        case "GUILD_LEADERBOARD_FILL":
            return {
                ...state,
                data: action.payload.data,
                realmGroup: action.payload.realmGroup,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export default guildsReducer;
