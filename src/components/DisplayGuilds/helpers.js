export function sortByProgression(guilds) {
    return guilds.sort((a, b) => {
        if (a.progression.completed && b.progression.completed) {
            return a.progression.completed - b.progression.completed;
        }
        return (
            b.progression.currentBossesDefeated -
            a.progression.currentBossesDefeated
        );
    });
}
