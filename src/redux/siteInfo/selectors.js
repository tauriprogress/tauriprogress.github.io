export function siteInfoLastUpdatedSelector(state) {
    return state.siteInfo.lastUpdated;
}

export function siteInfoIsUpdatingSelector(state) {
    return state.siteInfo.isUpdating;
}

export function siteInfoLoadingSelector(state) {
    return state.siteInfo.loading;
}

export function siteInfoErrorSelector(state) {
    return state.siteInfo.error;
}
