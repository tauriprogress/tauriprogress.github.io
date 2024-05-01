import {
    CHARACTER_DATA_LOADING_SET,
    CHARACTER_DATA_FILL,
    CHARACTER_DATA_ERROR_SET,
    CHARACTER_PROGRESSION_RAID_SET,
    CHARACTER_PROGRESSION_LOADING_SET,
    CHARACTER_PROGRESSION_FILL,
    CHARACTER_PROGRESSION_ERROR_SET,
    CHARACTER_RECENTKILLS_LOADING_SET,
    CHARACTER_RECENTKILLS_FILL,
    CHARACTER_RECENTKILLS_ERROR_SET,
    CHARACTER_ITEMS_LOADING_SET,
    CHARACTER_ITEMS_FILL,
    CHARACTER_ITEMS_ERROR_SET,
    CHARACTER_DATA_SET_NEW_CHARACTER,
} from "./actions";
import { REALM_GROUP_NAME_CHANGED } from "../actions";

import { getSocketInfo, gemColorsToSockets } from "../../helpers";
import { dataFromCharData } from "./helpers";

const defaultState = {
    data: {
        name: undefined,
        realm: undefined,
        stats: undefined,
        professions: undefined,
        title: undefined,
        faction: undefined,
        class: undefined,
        specName: undefined,
        guild: undefined,
        ilvl: undefined,
        lvl: undefined,
        race: undefined,
        items: undefined,
        loading: false,
        error: undefined,
    },
    items: {
        loading: false,
        data: {},
        error: undefined,
    },
    progression: {
        loading: false,
        data: undefined,
        error: undefined,
        selectedRaid: undefined,
        name: undefined,
        realm: undefined,
    },
    recentKills: {
        loading: false,
        data: undefined,
        error: undefined,
        name: undefined,
        realm: undefined,
    },
};

function isSameCharacter(payload, data) {
    if (
        data.name === payload.name.toLowerCase() &&
        payload.realm === data.realm &&
        payload.class === data.class
    ) {
        return true;
    }

    return false;
}

function characterReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return {
                ...defaultState,
            };

        case CHARACTER_DATA_SET_NEW_CHARACTER:
            if (isSameCharacter(action.payload, state.data)) {
                return state;
            }

            return {
                ...defaultState,
                data: {
                    ...defaultState.data,
                    name: action.payload.name.toLowerCase(),
                    realm: action.payload.realm,
                    class: action.payload.class,
                },
            };

        case CHARACTER_DATA_LOADING_SET:
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: true,
                    error: undefined,
                    name: action.payload.name.toLowerCase(),
                    realm: action.payload.realm,
                },
            };
        case CHARACTER_DATA_FILL:
            let newChar = dataFromCharData(action.payload);

            let newData = {
                ...state.data,
                ...newChar,
                loading: false,
                error: undefined,
            };

            return {
                ...state,
                data: {
                    ...newData,
                },
                items: { ...defaultState.items },
            };

        case CHARACTER_DATA_ERROR_SET:
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    error: action.payload,
                    loading: false,
                    name: undefined,
                    realm: undefined,
                },
            };
        case CHARACTER_PROGRESSION_LOADING_SET:
            return {
                ...state,
                progression: {
                    ...state.progression,
                    loading: true,
                    error: undefined,
                },
            };

        case CHARACTER_PROGRESSION_RAID_SET: {
            return {
                ...state,
                progression: {
                    ...state.progression,
                    selectedRaid: action.payload,
                },
            };
        }

        case CHARACTER_PROGRESSION_FILL:
            return {
                ...state,
                progression: {
                    ...state.progression,
                    data: { ...state.progression.data, ...action.payload.data },
                    loading: false,
                    error: undefined,
                    name: action.payload.name.toLowerCase(),
                    realm: action.payload.realm,
                },
            };

        case CHARACTER_PROGRESSION_ERROR_SET:
            return {
                ...state,
                progression: {
                    ...state.progression,
                    error: action.payload,
                    loading: false,
                    name: undefined,
                    realm: undefined,
                },
            };

        case CHARACTER_RECENTKILLS_LOADING_SET:
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    loading: action.payload.loading,
                    name: action.payload.name.toLowerCase(),
                    realm: action.payload.realm,
                },
            };

        case CHARACTER_RECENTKILLS_FILL:
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    loading: false,
                    error: undefined,
                    data: {
                        logs: action.payload.logs.map((log) => ({
                            id: log.log_id,
                            date: log.killtime,
                            boss: log.encounter_data.encounter_name,
                            difficulty: Number(log.difficulty),
                        })),
                    },
                },
            };

        case CHARACTER_RECENTKILLS_ERROR_SET:
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    loading: false,
                    error: action.payload,
                    name: undefined,
                    realm: undefined,
                },
            };

        case CHARACTER_ITEMS_LOADING_SET:
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: action.payload,
                    error: undefined,
                },
            };

        case CHARACTER_ITEMS_FILL:
            let data = { ...state.items.data, ...action.payload };

            for (let guid in data) {
                let item = data[guid];
                /* Socket info of item */
                if (!item.socketInfo) {
                    item.socketInfo = {
                        desc:
                            item.SocketBonusDesc !== ""
                                ? decodeURIComponent(item.SocketBonusDesc)
                                : false,
                        bonusCompleted: true,
                        sockets: [],
                    };

                    for (let [index, socket] of item.Socket.entries()) {
                        let gem = item.SocketContainedGem[index];

                        if (gem) {
                            gem.icon = `/small/${gem.icon}.png`;
                            gem.desc = decodeURIComponent(gem.desc);
                        }

                        if (gem || socket.Color !== 0) {
                            item.socketInfo.sockets.push({
                                ...getSocketInfo(socket.Color),
                                color: socket.Color,
                                gem: gem,
                            });
                        }
                        if (!gem && socket.Color !== 0) {
                            item.socketInfo.bonusCompleted = false;
                        } else if (
                            gem &&
                            !gemColorsToSockets[gem.color].matches[socket.Color]
                        ) {
                            item.socketInfo.bonusCompleted = false;
                        }
                    }
                }
            }

            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false,
                    data: data,
                },
            };
        case CHARACTER_ITEMS_ERROR_SET:
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false,
                    error: action.payload,
                },
            };

        default:
            return state;
    }
}

export default characterReducer;
