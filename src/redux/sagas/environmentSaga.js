import { put, takeEvery, select } from "redux-saga/effects";
import { environmentChanged } from "../actions";

function* commitEnvironmentChange() {
    const realmGroup = yield select(state => state.environment.realmGroup);
    yield put(environmentChanged(realmGroup));
}

export default function* environmentSaga() {
    yield takeEvery(["ENVIRONMENT_CHANGE_REALMGROUP"], commitEnvironmentChange);
}
