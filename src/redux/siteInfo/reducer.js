import {
    SITE_INFO_LOADING_SET,
    SITE_INFO_LAST_UPDATED_FILL,
    SITE_INFO_ERROR_SET
} from "./actions";

const defaultState = {
    lastUpdated: null,
    loading: false,
    error: null,
    isUpdating: false
};

function siteInfoReducer(state = defaultState, action) {
    switch (action.type) {
        case SITE_INFO_LOADING_SET:
            return { ...state, loading: action.payload, error: null };

        case SITE_INFO_LAST_UPDATED_FILL:
            return {
                ...state,
                lastUpdated: action.payload.lastUpdated,
                isUpdating: action.payload.isUpdating,
                loading: false,
                error: null
            };
        case SITE_INFO_ERROR_SET:
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
}

export default siteInfoReducer;
