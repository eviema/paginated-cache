import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import rootSaga from "./sagas/index";

export default ({ children, initialState = {} }) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware, logger)
  );

  sagaMiddleware.run(rootSaga);

  return <Provider store={store}>{children}</Provider>;
};
