import { getRealmGroupFromLocalStorage } from "../../helpers";
import { getCurrentRealmGroupName } from "../history/helpers";

export function environmentIconUrlSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .urls.icon;
}

export function environmentRaidsSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .currentContent.raids;
}

export function environmentCurrentRaidNameSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .currentContent.name;
}

export function environmentCurrentRaidBossesSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .currentContent.raids[0].bosses;
}

export function environmentArmoryUrlSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .urls.armory;
}

export function environmentCharacterClassNamesSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .characterClassNames;
}

export function environmentCharacterSpecsSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .specs;
}

export function environmentRealmsSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .realms;
}

export function environmentDifficultyNamesSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .difficultyNames;
}

export function environmentCompletionDifficultiesSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .currentContent.completionDifficulties;
}

export function environmentDifficultiesSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[
        realmGroupName || getRealmGroupFromLocalStorage()
    ].currentContent.raids[0].difficulties.toSorted((a, b) => b - a);
}

export function environmentBossCountSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .currentContent.bossCount;
}

export function environmentServerUrlSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .urls.server;
}

export function environmentShootUrlSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .urls.shoot;
}

export function environmentTalentsSelector(state) {
    const realmGroupName = getCurrentRealmGroupName();
    return state.environment[realmGroupName || getRealmGroupFromLocalStorage()]
        .talents;
}
