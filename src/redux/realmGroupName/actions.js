export const REALM_GROUP_NAME_CHANGED = "RAIDBOSS_CHARACTERS_FETCH";

export function changeRealmGroupName(payload) {
    localStorage.setItem("realmGroup", payload);
    return {
        type: REALM_GROUP_NAME_CHANGED,
        payload,
    };
}
