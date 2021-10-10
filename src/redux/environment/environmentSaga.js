import { put, takeEvery, select } from "redux-saga/effects";
import {
    environmentRealmGroupChanged,
    environmentSeasonalChanged
} from "./actions";
import {
    ENVIRONMENT_REALMGROUP_SET,
    ENVIRONMENT_SEASON_TOGGLE
} from "./actions";
import {
    environmentRealmGroupSelector,
    environmentIsSeasonalSelector
} from "../../redux/selectors";

function* commitEnvironmentChange({ type }) {
    const realmGroup = yield select(environmentRealmGroupSelector);
    const isSeasonal = yield select(environmentIsSeasonalSelector);
    if (type === ENVIRONMENT_REALMGROUP_SET) {
        yield put(environmentRealmGroupChanged({ realmGroup, isSeasonal }));
    } else {
        yield put(environmentSeasonalChanged({ realmGroup, isSeasonal }));
    }
}

export default function* environmentSaga() {
    yield takeEvery(
        [ENVIRONMENT_REALMGROUP_SET, ENVIRONMENT_SEASON_TOGGLE],
        commitEnvironmentChange
    );
}
