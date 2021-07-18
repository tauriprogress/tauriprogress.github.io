import { fork, take, cancel, select } from "redux-saga/effects";

export function* getServerUrl() {
    return yield select(state => {
        if (state.environment.seasonal.isSeasonal) {
            return state.environment.urls.seasonal;
        }
        return state.environment.urls.server;
    });
}

export function takeLatestIfTrue(actionName, generatorFunctionCondition, saga) {
    return fork(function* () {
        let lastSaga;

        while (true) {
            const action = yield take(actionName);

            if (!(yield generatorFunctionCondition(action))) {
                continue;
            }
            if (lastSaga) {
                yield cancel(lastSaga);
            }

            lastSaga = yield fork(saga, action);
        }
    });
}
