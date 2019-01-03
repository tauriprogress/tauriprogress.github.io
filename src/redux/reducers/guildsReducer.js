import { abbreviation } from "../../constants/currentContent";

const defaultState = {
    data: [],
    error: null,
    loading: true,
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
        case "GUILDS_SET_LOADING":
            return { ...state, loading: action.payload };
        case "GUILDS_FILL":
            return { ...state, data: action.payload, loading: false };
        default:
            return state;
    }
}

export default guildsReducer;
