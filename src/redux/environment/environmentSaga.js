import { put, takeEvery, select } from "redux-saga/effects";
import { environmentChanged } from "./actions";
import {
    ENVIRONMENT_REALMGROUP_SET,
    ENVIRONMENT_SEASON_TOGGLE
} from "./actions";
import { environmentRealmGroupSelector } from "../../redux/selectors";

function* commitEnvironmentChange() {
    const realmGroup = yield select(environmentRealmGroupSelector);
    yield put(environmentChanged(realmGroup));
}

export default function* environmentSaga() {
    yield takeEvery(
        [ENVIRONMENT_REALMGROUP_SET, ENVIRONMENT_SEASON_TOGGLE],
        commitEnvironmentChange
    );
}
