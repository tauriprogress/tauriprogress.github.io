import queryString from "query-string";
const filterFromUrl = queryString.parse(window.location.search);

const selectedTab = filterFromUrl.tab
    ? Number(filterFromUrl.tab) >= 0 && Number(filterFromUrl.tab) <= 3
        ? Number(filterFromUrl.tab)
        : 0
    : 0;

const defaultState = {
    data: null,
    error: null,
    loading: false,
    raidId: null,
    bossName: null,
    selectedTab: selectedTab
};

function raidBossReducer(state = defaultState, action) {
    switch (action.type) {
        case "RAIDBOSS_SELECT_TAB":
            return {
                ...state,
                selectedTab: action.payload
            };
        case "RAIDBOSS_LOADING":
            return {
                ...state,
                loading: true,
                raidId: action.payload.raidId,
                bossName: action.payload.bossName,
                error: null
            };
        case "RAIDBOSS_FILL":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };

        case "RAIDBOSS_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export default raidBossReducer;
