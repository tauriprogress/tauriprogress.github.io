import {
    GUILD_LIST_LOADING_SET,
    GUILD_LIST_FILL,
    GUILD_LIST_ERROR_SET
} from "./actions";

const defaultState = {
    data: null,
    error: null,
    loading: false
};

function guildsReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGED":
            return defaultState;
        case GUILD_LIST_LOADING_SET:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GUILD_LIST_FILL:
            return {
                ...state,
                data: applyGuildRanks(action.payload.guilds),
                loading: false,
                error: null
            };
        case GUILD_LIST_ERROR_SET:
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return {
                ...state,
                error: action.payload,
                loading: false
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
