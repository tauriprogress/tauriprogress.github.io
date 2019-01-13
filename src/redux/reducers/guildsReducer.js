import { abbreviation } from "../../constants/currentContent";

const defaultState = {
    data: null,
    error: null,
    loading: false,
    tableColumns: [
        { key: "guildName", label: "Name" },
        { key: "realm", label: "Realm" },
        { key: "gFaction", label: "Faction" },
        {
            key: "progression.currentBossesDefeated",
            label: `${abbreviation} Progression`
        }
    ]
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
                data: action.payload,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export default guildsReducer;
