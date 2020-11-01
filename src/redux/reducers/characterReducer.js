import constants from "tauriprogress-constants";

import { itemSlotNames } from "tauriprogress-constants";

import { getSocketInfo, gemColorsToSockets } from "../../helpers";

const defaultState = {
    characterName: null,
    realm: null,
    data: {
        loading: false,
        error: null,
        data: undefined
    },
    progression: {
        loading: false,
        error: null,
        data: undefined,
        selectedRaid: null
    },
    recentKills: {
        loading: false,
        data: undefined,
        error: null
    },
    items: {
        loading: false,
        data: {},
        error: null
    }
};

function characterReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGE_REALMGROUP":
            return {
                ...state,
                progression: {
                    ...state.progression,
                    selectedRaid: constants[action.payload].currentContent.name
                }
            };

        case "CHARACTER_DATA_SET_ERROR":
            if (!action.payload) {
                action.payload = "Unkown error.";
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    error: action.payload,
                    loading: false
                }
            };

        case "CHARACTER_DATA_LOADING":
            return {
                ...state,
                data: { ...state.data, loading: true, error: null },
                characterName: action.payload.characterName,
                realm: action.payload.realm
            };

        case "CHARACTER_DATA_FILL":
            return {
                ...state,
                data: {
                    ...state.data,
                    data: action.payload,
                    loading: false,
                    error: null
                },
                characterName: action.payload.name,
                realm: action.payload.realm,
                progression: { ...defaultState.progression },
                items: { ...defaultState.items }
            };

        case "CHARACTER_PROGRESSION_SELECT_RAID": {
            return {
                ...state,
                progression: {
                    ...state.progression,
                    selectedRaid: action.payload
                }
            };
        }

        case "CHARACTER_PROGRESSION_SET_ERROR":
            return {
                ...state,
                progression: {
                    ...state.progression,
                    error: action.payload,
                    loading: false
                }
            };

        case "CHARACTER_PROGRESSION_LOADING":
            return {
                ...state,
                progression: {
                    ...state.progression,
                    loading: true,
                    error: null
                }
            };

        case "CHARACTER_PROGRESSION_FILL":
            return {
                ...state,
                progression: {
                    ...state.progression,
                    data: { ...state.progression.data, ...action.payload },
                    loading: false,
                    error: null
                }
            };

        case "CHARACTER_RECENTKILLS_LOADING":
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    loading: action.payload
                }
            };

        case "CHARACTER_RECENTKILLS_SET_ERROR":
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    loading: false,
                    error: action.payload
                }
            };

        case "CHARACTER_RECENTKILLS_FILL":
            return {
                ...state,
                recentKills: {
                    ...state.recentKills,
                    loading: false,
                    error: null,
                    data: {
                        logs: action.payload.logs.map(log => ({
                            id: log.log_id,
                            date: log.killtime,
                            boss: log.encounter_data.encounter_name,
                            difficulty: Number(log.difficulty)
                        }))
                    }
                }
            };

        case "CHARACTER_ITEMS_LOADING":
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: action.payload,
                    error: null
                }
            };

        case "CHARACTER_ITEMS_SET_ERROR":
            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false,
                    error: action.payload
                }
            };

        case "CHARACTER_ITEMS_FILL":
            let data = { ...state.items.data, ...action.payload };
            let itemNames = {
                Head: 0,
                Shoulder: 1,
                Chest: 2,
                Hands: 3,
                Legs: 4
            };

            const items = [
                {
                    equipped: false,
                    guid: null
                },
                {
                    equipped: false,
                    guid: null
                },
                {
                    equipped: false,
                    guid: null
                },
                {
                    equipped: false,
                    guid: null
                },
                {
                    equipped: false,
                    guid: null
                }
            ];

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
                        sockets: []
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
                                gem: gem
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
                            items: item.ItemSetInfo.base.Items.reduce(
                                (acc, curr) => {
                                    acc[
                                        itemNames[itemSlotNames[curr.invType]]
                                    ] = {
                                        ...acc[
                                            itemNames[
                                                itemSlotNames[curr.invType]
                                            ]
                                        ],
                                        name: curr.name
                                    };
                                    return acc;
                                },
                                JSON.parse(JSON.stringify(items))
                            ),
                            effects: item.ItemSetInfo.base.Spells.filter(
                                effect => effect.spell !== ""
                            )
                        };

                    sets[setName].items[
                        itemNames[itemSlotNames[item.InventoryType]]
                    ] = {
                        equipped: true,
                        guid: guid,
                        name: data[guid].item_name
                    };
                    sets[setName].equipCount += 1;
                }
            }
            /* For each sets extend related item data with set info */
            for (let setName in sets) {
                let set = sets[setName];

                for (let item of set.items) {
                    data[item.guid] = {
                        ...data[item.guid],
                        set
                    };
                }
            }

            return {
                ...state,
                items: {
                    ...state.items,
                    loading: false,
                    data: data
                }
            };

        default:
            return state;
    }
}

export default characterReducer;
