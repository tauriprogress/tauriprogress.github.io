export function getCombatMetricFromDataSpecificationString(
    string,
    combatMetric
) {
    if (!string) {
        return combatMetric;
    }
    return string.includes("hps") ? "hps" : "dps";
}
