import constants from "tauriprogress-constants";
import { getRealmGroupOfLocalStorage, isUrlSeasonal } from "../../helpers";

function getSeasonalDefaultState() {
    const currentTime = new Date().getTime();

    const defaultRealmGroup = getRealmGroupOfLocalStorage();

    const seasons = constants[defaultRealmGroup].seasons;

    const hasSeasonal = !!(seasons.length > 0);

    let isSeasonRunning = false;
    let seasonName = undefined;
    let startTime = false;
    let finishTime = false;
    let nextStartTime = false;
    let nextSeasonName = undefined;

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
            nextSeasonName = season.name;
        }
    }

    return {
        isSeasonal: hasSeasonal && isUrlSeasonal(),
        hasSeasonal: hasSeasonal,
        isSeasonRunning: isSeasonRunning,
        seasonName: seasonName,
        startTime: startTime,
        finishTime: finishTime,
        nextStartTime: nextStartTime,
        nextSeasonName: nextSeasonName
    };
}

const defaultState = getSeasonalDefaultState();

if (!defaultState.hasSeasonal && isUrlSeasonal()) {
    window.history.replaceState(
        window.history.state,
        document.title,
        window.location.origin
    );
}

function seasonalReducer(state = defaultState, action) {
    switch (action.type) {
        case "ENVIRONMENT_CHANGE_REALMGROUP":
            return getSeasonalDefaultState();
        default:
            return state;
    }
}

export default seasonalReducer;
