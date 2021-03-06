const defaultState = {
    data: null,
    error: null,
    loading: false
};

function guildsReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGED":
            return defaultState;
        case "GUILDS_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case "GUILDS_LOAD":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "GUILDS_FILL":
            return {
                ...state,
                data: applyGuildRanks(action.payload.guilds),
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

function applyGuildRanks(guilds) {
    let first = -1;
    let second = 1;
    return guilds.sort((a, b) => {
        if (
            a.progression.completion.completed &&
            b.progression.completion.completed
        ) {
            return a.progression.completion.completed <
                b.progression.completion.completed
                ? first
                : second;
        }

        return a.progression.completion.bossesDefeated <
            b.progression.completion.bossesDefeated
            ? second
            : first;
    });
}

export default guildsReducer;
