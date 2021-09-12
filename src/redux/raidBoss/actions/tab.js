export const RAIDBOSS_TAB_SET = "RAIDBOSS_TAB_SET";

export function raidBossSetTab(payload) {
    return {
        type: RAIDBOSS_TAB_SET,
        payload
    };
}
