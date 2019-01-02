const defaultState = {
    data: [],
    error: null,
    loading: false
};

function raidReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAID_SET_LOADING":
            return { ...state, loading: action.payload };
        case "RAID_FILL":
            let data = [];

            for (let bossName in action.payload) {
                data.push({ ...action.payload[bossName], bossName });
            }

            return { ...state, data: data, loading: false };
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
