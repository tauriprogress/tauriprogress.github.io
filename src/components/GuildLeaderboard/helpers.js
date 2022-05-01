export function filterGuilds(filter, by, guilds) {
    if (!guilds) return [];
    return guilds
        .filter((guild) => {
            if (filter.faction !== "" && guild.f !== Number(filter.faction)) {
                return false;
            }

            if (filter.realm !== "" && guild.realm !== filter.realm) {
                return false;
            }

            if (!guild.ranking[filter.raid]) {
                return false;
            }

            if (!guild.ranking[filter.raid][filter.difficulty]) {
                return false;
            }

            if (
                !guild.ranking[filter.raid][filter.difficulty][by] ||
                !guild.ranking[filter.raid][filter.difficulty][by].time
            ) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            return (
                a.ranking[filter.raid][filter.difficulty][by].time -
                b.ranking[filter.raid][filter.difficulty][by].time
            );
        });
}
