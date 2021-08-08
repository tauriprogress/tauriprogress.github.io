import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import createRootReducer from "./reducers";
import saga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
    );

    sagaMiddleware.run(saga);

    return store;
}

const store = configureStore();

export default store;
