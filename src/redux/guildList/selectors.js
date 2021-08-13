export function guildListDataExistsSelector(state) {
    return !!state.guildList.data;
}

export function guildListEntireSelector(state) {
    return state.guildList;
}

export function guildListDataSelector(state) {
    return state.guildList.data;
}

export function guildListLoadingSelector(state) {
    return state.guildList.loading;
}
