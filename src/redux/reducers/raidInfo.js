import raidReducer from "./raidReducer";

const defaultState = {
    selectedDiff: 5,
    raids: undefined,
    raid: undefined
};

function raidInfo(state = defaultState, action) {
    switch (action.type) {
        case "RAID_INFO_CHANGE_DIFF":
            return { ...state, selectedDiff: action.payload };
        default:
            return {
                ...state,
                raid: raidReducer(state.raid, action, state.raids)
            };
    }
}

export default raidInfo;
