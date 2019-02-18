const defaultState = {
    data: null,
    error: null,
    loading: false,
    raidName: null,
    raidData: null,
    selected: 0
};

function raidReducer(state = defaultState, action, raids) {
    switch (action.type) {
        case "RAID_CHANGE_RAIDDATA":
            let raidData = raids.reduce((acc, curr) => {
                if (curr.name === action.payload) acc = curr;
                return acc;
            }, null);

            return {
                ...state,
                raidName: action.payload,
                raidData
            };

        case "RAID_SELECT_BOSS":
            return {
                ...state,
                selected: action.payload
            };

        case "RAID_LOADING":
            return {
                ...state,
                loading: true,
                error: null,
                raidName: action.payload
            };
        case "RAID_FILL":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };
        case "RAID_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export default raidReducer;
