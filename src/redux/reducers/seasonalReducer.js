import constants from "tauriprogress-constants";
import { getRealmGroupOfLocalStorage } from "../../helpers";

const currentTime = new Date().getTime();

const defaultRealmGroup = getRealmGroupOfLocalStorage();

const seasons = constants[defaultRealmGroup].seasons;

const hasSeasonal = !!(seasons.length > 0);

let isSeasonRunning = false;
let seasonName = undefined;
let startTime = false;
let finishTime = false;
let nextStartTime = false;

for (const season of seasons) {
    const currentStartTime = new Date(season.start).getTime();
    const currentFinishTime = new Date(season.finish).getTime();
    if (currentTime > currentStartTime && currentTime < currentFinishTime) {
        isSeasonRunning = true;
        seasonName = season.name;
        startTime = currentStartTime;
        finishTime = currentFinishTime;
    }

    if (!nextStartTime && currentTime < currentStartTime) {
        nextStartTime = currentStartTime;
    }
}

const defaultState = {
    isSeasonal: !!new RegExp(/^\/seasonal/).test(window.location.pathname),
    hasSeasonal: hasSeasonal,
    isSeasonRunning: isSeasonRunning,
    seasonName: seasonName,
    startTime: startTime,
    finishTime: finishTime,
    nextStartTime: nextStartTime
};

console.log(defaultState);

function seasonalReducer(state = defaultState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default seasonalReducer;
