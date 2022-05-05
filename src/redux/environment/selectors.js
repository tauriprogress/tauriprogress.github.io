export function environmentIconUrlSelector(state) {
    return state.environment.urls.icon;
}

export function environmentRaidsSelector(state) {
    return state.environment.currentContent.raids;
}

export function environmentCurrentRaidNameSelector(state) {
    return state.environment.currentContent.name;
}

export function environmentRealmGroupSelector(state) {
    return state.environment.realmGroup;
}

export function environmentArmoryUrlSelector(state) {
    return state.environment.urls.armory;
}

export function environmentCharacterClassNamesSelector(state) {
    return state.environment.characterClassNames;
}

export function environmentCharacterSpecsSelector(state) {
    return state.environment.specs;
}

export function environmentRealmsSelector(state) {
    return state.environment.realms;
}

export function environmentDifficultyNamesSelector(state) {
    return state.environment.difficultyNames;
}

export function environmentCompletionDifficultiesSelector(state) {
    return state.environment.currentContent.completionDifficulties;
}

export function environmentDifficultiesSelector(state) {
    return state.environment.currentContent.raids[0].difficulties;
}

export function environmentBossCountSelector(state) {
    return state.environment.currentContent.bossCount;
}

export function environmentIsSeasonalSelector(state) {
    return state.environment.seasonal.isSeasonal;
}

export function environmentHasSeasonalSelector(state) {
    return state.environment.seasonal.hasSeasonal;
}

export function environmentSeasonNameSelector(state) {
    return state.environment.seasonal.seasonName;
}

export function environmentNextSeasonNameSelector(state) {
    return state.environment.seasonal.nextSeasonName;
}

export function environmentEntireSeasonalSelector(state) {
    return state.environment.seasonal;
}

export function environmentSeasonalUrlSelector(state) {
    return state.environment.urls.seasonal;
}

export function environmentServerUrlSelector(state) {
    return state.environment.urls.server;
}

export function environmentShootUrlSelector(state) {
    return state.environment.urls.shoot;
}

export function environmentTalentsSelector(state) {
    return state.environment.talents;
}
