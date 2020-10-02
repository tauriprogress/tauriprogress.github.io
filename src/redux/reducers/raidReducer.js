const defaultState = {
    selected: 0,
    error: null,
    loading: false,
    filter: {
        difficulty: 6,
        class: "",
        spec: "",
        role: "",
        faction: "",
        realm: ""
    }
};

function raidReducer(state = defaultState, action, raids) {
    switch (action.type) {
        case "RAID_FILTER_SET":
            if (action.payload.filterName === "class") {
                return {
                    ...state,
                    filter: {
                        ...state.filter,
                        [action.payload.filterName]: action.payload.value,
                        spec: ""
                    }
                };
            }

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.filterName]: action.payload.value
                }
            };
        case "RAID_FILTER_RESET":
            return { ...state, filter: defaultState.filter };
        default:
            return state;
    }
}

export default raidReducer;
