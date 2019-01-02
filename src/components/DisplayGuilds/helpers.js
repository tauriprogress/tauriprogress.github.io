export function sortByProgression(guilds) {
    return guilds.sort((a, b) => {
        return (
            b.progression.currentBossesDefeated -
            a.progression.currentBossesDefeated
        );
    });
}
