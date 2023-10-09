import { convertFightLength } from "../../helpers";

export function transformGuilds(guilds) {
    return guilds.map((guild) => {
        const firstLog = guild.logs[0];
        let start = firstLog.date * 1000 - firstLog.fightLength;
        return {
            ...guild,
            name: guild.guildName,
            time: convertFightLength(guild.time),
            logs: guild.logs.map((log, index) => {
                return {
                    ...log,
                    time:
                        "+ " +
                        (index === 0
                            ? convertFightLength(log.fightLength)
                            : convertFightLength(
                                  log.date * 1000 -
                                      guild.logs[index - 1].date * 1000
                              )),

                    secondary: () =>
                        convertFightLength(log.date * 1000 - start),
                };
            }),
        };
    });
}
