export const RAIDSUMMARY_FETCH = "RAIDSUMMARY_FETCH";
export const RAIDSUMMARY_LOADING_SET = "RAIDSUMMARY_LOADING_SET";
export const RAIDSUMMARY_FILL = "RAIDSUMMARY_FILL";
export const RAIDSUMMARY_ERROR_SET = "RAIDSUMMARY_ERROR_SET";

export function raidSummaryFetch(raidId) {
    return {
        type: RAIDSUMMARY_FETCH,
        payload: raidId
    };
}

export function raidSummarySetLoading(loading) {
    return {
        type: RAIDSUMMARY_LOADING_SET,
        payload: loading
    };
}

export function raidSummaryFill(data) {
    return {
        type: RAIDSUMMARY_FILL,
        payload: data
    };
}

export function raidSummarySetError(error) {
    return {
        type: RAIDSUMMARY_ERROR_SET,
        payload: error
    };
}
