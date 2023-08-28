export const SITE_INFO_LOADING_SET = "SITE_INFO_LOADING_SET";
export const SITE_INFO_LAST_UPDATED_FILL = "SITE_INFO_LAST_UPDATED_FILL";
export const SITE_INFO_ERROR_SET = "SITE_INFO_ERROR_SET";

export function siteInfoSetLoading(payload) {
    return {
        type: SITE_INFO_LOADING_SET,
        payload,
    };
}

export function siteInfoFill(payload) {
    return {
        type: SITE_INFO_LAST_UPDATED_FILL,
        payload,
    };
}

export function siteInfoSetError(payload) {
    return {
        type: SITE_INFO_ERROR_SET,
        payload,
    };
}
