import { sortGuilds } from "../../components/DisplayGuilds/helpers";

const defaultState = {
    data: null,
    error: null,
    loading: false
};

function guildsReducer(state = defaultState, action) {
    switch (action.type) {
        case "GUILDS_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        case "GUILDS_LOAD":
            return { ...state, loading: true, error: null };
        case "GUILDS_FILL":
            return {
                ...state,
                data: sortGuilds(action.payload, {
                    by: "completion",
                    direction: "asc"
                }).map((guild, index) => ({
                    ...guild,
                    rank: index + 1
                })),
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export default guildsReducer;
