import { LOG_LOADING_SET, LOG_FILL, LOG_ERROR_SET } from "./actions";
import {
    ENVIRONMENT_REALMGROUP_CHANGED,
    ENVIRONMENT_SEASONAL_CHANGED,
    ENVIRONMENT_SET
} from "../actions";

const defaultState = {
    data: null,
    error: null,
    loading: false
};

function logReducer(state = defaultState, action) {
    switch (action.type) {
        case ENVIRONMENT_SET:
        case ENVIRONMENT_REALMGROUP_CHANGED:
        case ENVIRONMENT_SEASONAL_CHANGED:
            return {
                data: null,
                error: null,
                loading: false
            };
        case LOG_LOADING_SET:
            return { ...state, loading: true, error: null };

        case LOG_FILL:
            let data = action.payload;
            data.members = data.members.map(member => ({
                ...member,
                dps: Math.round(member.dmg_done / (data.fight_time / 1000)),
                hps: Math.round(
                    (member.heal_done + member.absorb_done) /
                        (data.fight_time / 1000)
                ),
                total_healing: member.heal_done + member.absorb_done
            }));
            return { ...state, data: data, loading: false, error: null };

        case LOG_ERROR_SET:
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
}

export default logReducer;
