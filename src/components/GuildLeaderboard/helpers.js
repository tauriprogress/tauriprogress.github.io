import { SecondaryTextSpan } from ".";
import { convertFightLength, dateTextHours } from "../../helpers";
import DisplayDate from "../DisplayDate";

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

export function transformGuildFullClearRankingToLeaderboardItems(
    guilds,
    filter
) {
    return guilds.map((guild) => {
        const firstLog =
            guild.ranking[filter.raid][filter.difficulty].fullClear.logs[0];

        let start = firstLog.date * 1000 - firstLog.fightLength;
        const logs =
            guild.ranking[filter.raid][filter.difficulty].fullClear.logs;

        return {
            ...guild,
            time: convertFightLength(
                guild.ranking[filter.raid][filter.difficulty].fullClear.time
            ),
            logs: logs.map((log, index) => {
                return {
                    ...log,
                    time:
                        "+ " +
                        (index === 0
                            ? convertFightLength(log.fightLength)
                            : convertFightLength(
                                  log.date * 1000 - logs[index - 1].date * 1000
                              )),

                    secondary: () =>
                        convertFightLength(log.date * 1000 - start),
                };
            }),
        };
    });
}

export function transformGuildFastestKillToLeaderboardItems(guilds, filter) {
    return guilds.map((guild) => {
        const logs =
            guild.ranking[filter.raid][filter.difficulty].fastestKills.logs;

        return {
            ...guild,
            time: convertFightLength(
                guild.ranking[filter.raid][filter.difficulty].fastestKills.time
            ),
            logs: logs.map((log) => {
                return {
                    ...log,
                    time: convertFightLength(log.fightLength),
                    secondary: () => (
                        <DisplayDate date={new Date(log.date * 1000)}>
                            {" "}
                            <SecondaryTextSpan>
                                - {dateTextHours(new Date(log.date * 1000))}
                            </SecondaryTextSpan>
                        </DisplayDate>
                    ),
                };
            }),
        };
    });
}
