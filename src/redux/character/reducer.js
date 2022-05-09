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
} from "./actions";
import {
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED,
    ENVIRONMENT_SET,
} from "../actions";

import {
    getSocketInfo,
    gemColorsToSockets,
    validRaidNameOfEnv,
    getDefaultRaidName,
} from "../../helpers";

const defaultState = {
    characterName: null,
    realm: null,
    data: {
        loading: false,
        error: null,
        data: undefined,
    },
    progression: {
        loading: false,
        error: null,
        data: undefined,
        selectedRaid: null,
    },
    recentKills: {
        loading: false,
        data: undefined,
        error: null,
    },
    items: {
        loading: false,
        data: {},
        error: null,
    },
};

function characterReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_REALMGROUP_CHANGED:
            return {
                ...defaultState,
                progression: {
                    ...defaultState.progression,
                    selectedRaid: getDefaultRaidName(action.payload.realmGroup),
                },
            };
        case ENVIRONMENT_SET:
        case ENVIRONMENT_SEASONAL_CHANGED:
            return {
                ...state,
                progression: {
                    loading: false,
                    error: null,
                    data: undefined,
                    selectedRaid: validRaidNameOfEnv(
                        state.progression.selectedRaid,
                        action.payload.realmGroup,
                        action.payload.isSeasonal
                    )
                        ? state.progression.selectedRaid
                        : getDefaultRaidName(action.payload.realmGroup),
                },
            };
        case CHARACTER_DATA_LOADING_SET:
            return {
                ...state,
                data: { ...state.data, loading: true, error: null },
                characterName: action.payload.characterName,
                realm: action.payload.realm,
            };
        case CHARACTER_DATA_FILL:
            return {
                ...state,
                data: {
                    ...state.data,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
                characterName: action.payload.name,
                realm: action.payload.realm,
                progression: { ...defaultState.progression },
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
                },
            };
        case CHARACTER_PROGRESSION_LOADING_SET:
            return {
                ...state,
                progression: {
                    ...state.progression,
                    loading: true,
                    error: null,
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
                    data: { ...state.progression.data, ...action.payload },
                    loading: false,
                    error: null,
                },
            };

        case CHARACTER_PROGRESSION_ERROR_SET:
            return {
                ...state,
                progression: {
                    ...state.progression,
                    error: action.payload,
                    loading: false,
                },
            };

        case CHARACTER_RECENTKILLS_LOADING_SET:
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    loading: action.payload,
                },
            };

        case CHARACTER_RECENTKILLS_FILL:
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    loading: false,
                    error: null,
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
                },
            };

        case CHARACTER_ITEMS_LOADING_SET:
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: action.payload,
                    error: null,
                },
            };

        case CHARACTER_ITEMS_FILL:
            let data = { ...state.items.data, ...action.payload };

            let sets = {};

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
                /* Count set items */
                let itemSetInfo = item.ItemSetInfo;
                if (itemSetInfo.base) {
                    let setName = itemSetInfo.base.name;

                    if (!sets[setName])
                        sets[setName] = {
                            equipCount: 0,
                            items: item.ItemSetInfo.base.Items.sort(
                                (a, b) => a.invType - b.invType
                            ),
                            effects: item.ItemSetInfo.base.Spells.filter(
                                (effect) => effect.spell !== ""
                            ),
                        };

                    for (let i = 0; i < sets[setName].items.length; i++) {
                        let setItem = sets[setName].items[i];

                        if (
                            setItem.invType === item.InventoryType &&
                            !setItem.equipped
                        ) {
                            sets[setName].items[i] = {
                                equipped: true,
                                guid: guid,
                                name: data[guid].item_name,
                            };

                            sets[setName].equipCount += 1;
                            break;
                        }
                    }
                }
            }

            /* For each sets extend related item data with set info */
            for (let setName in sets) {
                let set = sets[setName];

                for (let item of set.items) {
                    data[item.guid] = {
                        ...data[item.guid],
                        set,
                    };
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
