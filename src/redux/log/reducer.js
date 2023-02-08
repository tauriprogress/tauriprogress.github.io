import {
    LOG_LOADING_SET,
    LOG_FILL,
    LOG_ERROR_SET,
    LOG_LOOT_LOADING_SET,
    LOG_LOOT_FILL,
    LOG_LOOT_ERROR_SET,
} from "./actions";
import { REALM_GROUP_NAME_CHANGED } from "../actions";

const defaultLootState = {
    data: undefined,
    loading: false,
    error: undefined,
};

const defaultState = {
    data: undefined,
    error: undefined,
    loading: false,
    loot: defaultLootState,
};

function logReducer(state = defaultState, action) {
    switch (action.type) {
        case REALM_GROUP_NAME_CHANGED:
            return {
                data: undefined,
                loading: false,
                error: undefined,
                loot: defaultLootState,
            };
        case LOG_LOADING_SET:
            return {
                ...state,
                loading: true,
                error: undefined,
                loot: defaultLootState,
            };

        case LOG_FILL:
            let data = action.payload;
            data.members = data.members.map((member) => ({
                ...member,
                dps: Math.round(member.dmg_done / (data.fight_time / 1000)),
                hps: Math.round(
                    (member.heal_done + member.absorb_done) /
                        (data.fight_time / 1000)
                ),
                total_healing: member.heal_done + member.absorb_done,
            }));
            return {
                ...state,
                data: data,
                loading: false,
                error: undefined,
                loot: defaultLootState,
            };

        case LOG_ERROR_SET:
            return {
                ...state,
                loading: false,
                error: action.payload,
                loot: defaultLootState,
            };
        case LOG_LOOT_LOADING_SET:
            return {
                ...state,
                loot: {
                    ...state.loot,
                    data: undefined,
                    loading: true,
                    error: undefined,
                },
            };

        case LOG_LOOT_FILL:
            return {
                ...state,
                loot: {
                    ...state.loot,
                    data: action.payload,
                    loading: false,
                    error: undefined,
                },
            };

        case LOG_LOOT_ERROR_SET:
            return {
                ...state,
                loot: {
                    ...state.loot,
                    data: undefined,
                    loading: false,
                    error: action.payload,
                },
            };
        default:
            return state;
    }
}

export default logReducer;
