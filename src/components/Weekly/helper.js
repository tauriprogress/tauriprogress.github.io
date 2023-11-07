export function filterWeeklyCharacters(data, combatMetric, selectedClass) {
    let characters = [];
    for (const classId in data) {
        for (const specId in data[classId]) {
            if (
                selectedClass === "" ||
                selectedClass === classId ||
                selectedClass === specId
            ) {
                characters = characters.concat(data[classId][specId]);
            }
        }
    }

    return characters
        .sort((a, b) => b[combatMetric] - a[combatMetric])
        .slice(0, 10);
}
