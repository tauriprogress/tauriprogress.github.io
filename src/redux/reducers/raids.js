import { raids } from "tauriprogress-constants/currentContent";

let defaultState = getDefaultState();

function getDefaultState() {
    let bosses = {};
    let newState = [];
    function onlyUnique(value, index, self) {
        let filter = false;
        if (!bosses[value.encounter_name]) {
            filter = true;
        }

        bosses[value.encounter_name] = true;

        return filter;
    }

    for (let raid of raids) {
        let raidInfo = require(`tauriprogress-constants/${raid.raidName}`);
        newState.push({
            ...{
                ...raidInfo,
                encounters: raidInfo.encounters.filter(onlyUnique)
            },
            picture: require(`../../assets/raids/${raidInfo.picture}`)
        });
    }

    return newState;
}

function raidsReducer(state = defaultState, action) {
    return state;
}

export default raidsReducer;
