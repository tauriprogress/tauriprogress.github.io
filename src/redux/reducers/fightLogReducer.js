const defaultState = {
    data: null,
    error: null,
    loading: false
};

function fightLogReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGE_REALMGROUP":
            return {
                data: null,
                error: null,
                loading: false
            };

        case "FIGHTLOG_SET_ERROR":
            return { ...state, error: action.payload, loading: false };
        case "FIGHTLOG_LOADING":
            return { ...state, loading: true, error: null };
        case "FIGHTLOG_FILL":
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
        default:
            return state;
    }
}

export default fightLogReducer;
