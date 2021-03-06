import { select } from "redux-saga/effects";

export function* getServerUrl() {
    return yield select(state => {
        if (state.environment.seasonal.isSeasonal) {
            return state.environment.urls.seasonal;
        }
        return state.environment.urls.server;
    });
}
