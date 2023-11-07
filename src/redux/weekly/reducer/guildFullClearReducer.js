import { convertFightLength } from "../../../helpers";
import { REALM_GROUP_NAME_CHANGED } from "../../actions";
import {
    WEEKLY_GUILDFULLCLEAR_ERROR_SET,
    WEEKLY_GUILDFULLCLEAR_FILL,
    WEEKLY_GUILDFULLCLEAR_LOADING_SET,
} from "../actions/guildFullClear";

const defaultState = {
    guilds: undefined,
    loading: false,
    error: undefined,
};

function transformGuilds(guilds) {
    return guilds
        .map((guild) => {
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
        })
        .reduce((acc, curr) => {
            if (!acc[curr.difficulty]) {
                acc[curr.difficulty] = [];
            }
            acc[curr.difficulty].push(curr);
            return acc;
        }, {});
}

function guildFullClearReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return defaultState;

        case WEEKLY_GUILDFULLCLEAR_LOADING_SET:
            return {
                ...state,
                error: undefined,
                loading: true,
            };

        case WEEKLY_GUILDFULLCLEAR_FILL:
            return {
                ...state,
                error: undefined,
                loading: false,
                guilds: transformGuilds(action.payload.guilds),
            };
        case WEEKLY_GUILDFULLCLEAR_ERROR_SET:
            return {
                ...state,
                error: action.payload,
                loading: false,
                guilds: undefined,
            };
        default:
            return state;
    }
}

export default guildFullClearReducer;
