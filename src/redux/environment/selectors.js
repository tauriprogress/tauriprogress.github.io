export function environmentIconUrlSelector(state, realmGroupName) {
    return state.environment[realmGroupName].urls.icon;
}

export function environmentRaidsSelector(state, realmGroupName) {
    return state.environment[realmGroupName].currentContent.raids;
}

export function environmentCurrentRaidNameSelector(state, realmGroupName) {
    return state.environment[realmGroupName].currentContent.name;
}

export function environmentArmoryUrlSelector(state, realmGroupName) {
    return state.environment[realmGroupName].urls.armory;
}

export function environmentCharacterClassNamesSelector(state, realmGroupName) {
    return state.environment[realmGroupName].characterClassNames;
}

export function environmentCharacterSpecsSelector(state, realmGroupName) {
    return state.environment[realmGroupName].specs;
}

export function environmentRealmsSelector(state, realmGroupName) {
    return state.environment[realmGroupName].realms;
}

export function environmentDifficultyNamesSelector(state, realmGroupName) {
    return state.environment[realmGroupName].difficultyNames;
}

export function environmentCompletionDifficultiesSelector(
    state,
    realmGroupName
) {
    return state.environment[realmGroupName].currentContent
        .completionDifficulties;
}

export function environmentDifficultiesSelector(state, realmGroupName) {
    return state.environment[realmGroupName].currentContent.raids[0]
        .difficulties;
}

export function environmentBossCountSelector(state, realmGroupName) {
    return state.environment[realmGroupName].currentContent.bossCount;
}

export function environmentServerUrlSelector(state, realmGroupName) {
    return state.environment[realmGroupName].urls.server;
}

export function environmentShootUrlSelector(state, realmGroupName) {
    return state.environment[realmGroupName].urls.shoot;
}

export function environmentTalentsSelector(state, realmGroupName) {
    return state.environment[realmGroupName].talents;
}
