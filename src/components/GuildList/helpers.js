import { guildActivityBoundary } from "../../helpers";

export function filterGuildList(filter, guildList) {
    const timeBoundary = guildActivityBoundary();

    const filteredGuildList = guildList.filter(guild => {
        if (filter.faction !== "" && guild.faction !== Number(filter.faction)) {
            return false;
        }

        if (filter.realm !== "" && guild.realm !== filter.realm) {
            return false;
        }

        if (
            filter.difficulty !== "" &&
            !guild.progression.completion[filter.difficulty]
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
                a.progression.completion[filter.difficulty].completed &&
                b.progression.completion[filter.difficulty].completed
            ) {
                return a.progression.completion[filter.difficulty].completed <
                    b.progression.completion[filter.difficulty].completed
                    ? first
                    : second;
            }

            return a.progression.completion[filter.difficulty].progress <
                b.progression.completion[filter.difficulty].progress
                ? second
                : first;
        });
    }

    return filteredGuildList;
}
