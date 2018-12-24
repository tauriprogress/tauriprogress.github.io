import { raids } from "../../constants/currentContent";
let defaultState = [];

for (let raid of raids) {
    let raidInfo = require(`../../constants/${raid.raidName}`);
    defaultState.push({
        ...raidInfo,
        picture: require(`../../assets/raids/${raidInfo.picture}`)
    });
}

function raidsReducer(state = defaultState, action) {
    return state;
}

export default raidsReducer;
