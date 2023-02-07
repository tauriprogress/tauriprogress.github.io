export function environmentIconUrlSelector(state, realmGroupName) {
    return state.environment[realmGroupName].urls.icon;
}

export function environmentRaidsSelector(state, realmGroupName) {
    return state.environment[realmGroupName].currentContent.raids;
}

export function environmentCurrentRaidNameSelector(state, realmGroupName) {
    return state.environment[realmGroupName].currentContent.name;
}

export function environmentRealmGroupSelector(state, realmGroupName) {
    return state.environment[realmGroupName].realmGroup;
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

export function environmentIsSeasonalSelector(state, realmGroupName) {
    return state.environment[realmGroupName].seasonal.isSeasonal;
}

export function environmentHasSeasonalSelector(state, realmGroupName) {
    return state.environment[realmGroupName].seasonal.hasSeasonal;
}

export function environmentSeasonNameSelector(state, realmGroupName) {
    return state.environment[realmGroupName].seasonal.seasonName;
}

export function environmentNextSeasonNameSelector(state, realmGroupName) {
    return state.environment[realmGroupName].seasonal.nextSeasonName;
}

export function environmentEntireSeasonalSelector(state, realmGroupName) {
    return state.environment[realmGroupName].seasonal;
}

export function environmentSeasonalUrlSelector(state, realmGroupName) {
    return state.environment[realmGroupName].urls.seasonal;
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
