export function characterNameSelector(state) {
    return state.character.characterName;
}

export function characterRealmSelector(state) {
    return state.character.realm;
}

export function characterClassSelector(state) {
    return state.character.data.data && state.character.data.data.class;
}

export function characterDataSelector(state) {
    return state.character.data.data;
}

export function characterDataLoadingSelector(state) {
    return state.character.data.loading;
}

export function characterDataErrorSelector(state) {
    return state.character.data.error;
}

export function characterDataIncompleteItemsSelector(state) {
    return (
        !!state.character.data.data && state.character.data.data.characterItems
    );
}

export function characterItemsLoadingSelector(state) {
    return state.character.items.loading;
}

export function characterItemsSelector(state) {
    return state.character.items.data;
}

export function characteritemsErrorSelector(state) {
    return state.character.items.error;
}

export function characterItemsItemSelector(state, id) {
    return state.character.items.data[id];
}

export function characterProgressionLoadingSelector(state) {
    return state.character.progression.loading;
}

export function characterProgressionEntireSelector(state) {
    return state.character.progression;
}

export function characterProgressionRaidDataExistsSelector(state, raidName) {
    return !!(
        state.character.progression.data &&
        state.character.progression.data[raidName]
    );
}

export function characterRecentKillsEntireSelector(state) {
    return state.character.recentKills;
}

export function characterRecentKillsLoadingSelector(state) {
    return state.character.recentKills.loading;
}
