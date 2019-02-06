const defaultState = {
    data: null,
    error: null,
    loading: false,
    raidName: null,
    raidData: null
};

function raidReducer(state = defaultState, action, raids) {
    switch (action.type) {
        case "RAID_LOADING":
            const raidName = action.payload;
            let raidData = raids.reduce((acc, curr) => {
                if (curr.name === raidName) acc = curr;
                return acc;
            }, null);

            return { ...state, loading: true, error: null, raidName, raidData };
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
