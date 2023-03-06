import { guildActivityBoundary } from "../../helpers";

export function filterGuildList(filter, guildList) {
    const timeBoundary = guildActivityBoundary();

    const filteredGuildList = guildList.filter((guild) => {
        if (filter.f !== "" && guild.f !== Number(filter.f)) {
            return false;
        }

        if (filter.realm !== "" && guild.realm !== filter.realm) {
            return false;
        }

        if (
            filter.difficulty !== "" &&
            !guild.progression.completion.difficulties[filter.difficulty]
        ) {
            return false;
        }

        if (filter.activity !== "") {
            if (typeof filter.activity === "number") {
                if (
                    !guild.activity[filter.activity] ||
                    timeBoundary > guild.activity[filter.activity] * 1000
                ) {
                    return false;
                }
            } else {
                let isActive = false;

                for (let difficulty in guild.activity) {
                    if (timeBoundary < guild.activity[difficulty] * 1000) {
                        isActive = true;
                    }
                }

                return isActive === filter.activity;
            }
        }

        return true;
    });

    if (filter.difficulty) {
        return filteredGuildList.sort((a, b) => {
            let first = -1;
            let second = 1;

            if (
                a.progression.completion.difficulties[filter.difficulty]
                    .completed &&
                b.progression.completion.difficulties[filter.difficulty]
                    .completed
            ) {
                return a.progression.completion.difficulties[filter.difficulty]
                    .completed <
                    b.progression.completion.difficulties[filter.difficulty]
                        .completed
                    ? first
                    : second;
            }

            return a.progression.completion.difficulties[filter.difficulty]
                .bossesDefeated <
                b.progression.completion.difficulties[filter.difficulty]
                    .bossesDefeated
                ? second
                : first;
        });
    }
    return filteredGuildList;
}

export function isActiveGuild(guild, difficulty) {
    const timeBoundary = guildActivityBoundary();
    return !(timeBoundary > guild.activity[difficulty] * 1000);
}

export function getGuildProgress(guild) {
    let progress = {};
    for (let difficulty in guild.progression.completion.difficulties) {
        let date =
            guild.progression.completion.difficulties[difficulty].completed *
            1000;
        progress[difficulty] = {
            date: date ? new Date(date) : false,
            bossesDefeated:
                guild.progression.completion.difficulties[difficulty]
                    .bossesDefeated,
        };
    }
    return progress;
}
