import cacheSagas from "./sagas_cache";
import cardSetSagas from "./sagas_card_set";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([...cacheSagas, ...cardSetSagas]);
}
