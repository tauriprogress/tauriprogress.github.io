export function sortGuilds(guilds, { by, direction }) {
    let first = 1;
    let second = -1;
    if (direction === "asc") {
        first = -1;
        second = 1;
    }

    if (by === "completion") {
        return guilds.sort((a, b) => {
            if (a.progression.completed && b.progression.completed) {
                return a.progression.completed < b.progression.completed
                    ? first
                    : second;
            }

            if (
                a.progression.currentBossesDefeated ===
                b.progression.currentBossesDefeated
            ) {
                return a.rank < b.rank ? first : second;
            }

            return a.progression.currentBossesDefeated <
                b.progression.currentBossesDefeated
                ? second
                : first;
        });
    }

    return guilds.sort((a, b) => {
        if (a[by] === b[by]) {
            if (a.progression.completed && b.progression.completed) {
                return a.progression.completed - b.progression.completed;
            }

            if (
                a.progression.currentBossesDefeated ===
                b.progression.currentBossesDefeated
            ) {
                return a.rank > b.rank;
            }

            return (
                a.progression.currentBossesDefeated <
                b.progression.currentBossesDefeated
            );
        } else {
            return a[by] < b[by] ? first : second;
        }
    });
}
