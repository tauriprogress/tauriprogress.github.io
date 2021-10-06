import { put, select, takeEvery } from "redux-saga/effects";
import { push, replace } from "connected-react-router";
import { isPathSeasonal, getSearchQueryString } from "../../helpers";

function* handeHistoryAction({ type, payload }) {
    const pathname = yield select(state => state.router.location.pathname);
    const startOfNewPathName = isPathSeasonal(pathname) ? `/seasonal` : "";

    switch (type) {
        case "HISTORY_PUSH":
            yield put(push(`${startOfNewPathName}${payload}`));
            break;
        case "HISTORY_REPLACE":
            yield put(replace(`?${getSearchQueryString(payload)}`));
            break;
        default:
            yield true;
    }
}

export default function* historySaga() {
    yield takeEvery(["HISTORY_PUSH", "HISTORY_REPLACE"], handeHistoryAction);
}
