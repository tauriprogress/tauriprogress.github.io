export const REALM_GROUP_NAME_CHANGED = "REALM_GROUP_NAME_CHANGED";

export function changeRealmGroupName(payload) {
    localStorage.setItem("realmGroup", payload);
    return {
        type: REALM_GROUP_NAME_CHANGED,
        payload,
    };
}
