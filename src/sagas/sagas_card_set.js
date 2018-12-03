import { takeLatest, call, fork, put, select } from "redux-saga/effects";
import * as actions from "../actions/index";
import * as api from "../api/cache";
import mapCards from "./helper";

// worker saga to update active card set
function* updateCardSet(action) {
  let newCardSet;

  // get the latest page number user has requested
  const activePageNumber = action.payload;

  const getCache = state => state.cardCache;
  const currentCache = yield select(getCache);
  const pageNumbersInCache = currentCache.pageNumbers;
  const cardCache = currentCache.cache;

  // if page requested is in cache
  if (pageNumbersInCache.includes(activePageNumber)) {
    for (var i = 0; i < cardCache.length; i++) {
      if (cardCache[i].pageNumberInCache === activePageNumber) {
        newCardSet = cardCache[i].cardsOnPage;
        i = cardCache.length;
      }
    }
  }
  // if page requested NOT in cache
  // fetch new active card set via an api call
  else {
    // calculate the params (i.e. page, perPage) needed for api call
    const nextApiCallParams = {
      page: activePageNumber - 1,
      perPage: 12
    };
    // fetch that page
    const pageRequstedAndNotInCacheYet = yield call(
      api.getNextCache,
      nextApiCallParams
    );
    // preprocess data
    newCardSet = mapCards(pageRequstedAndNotInCacheYet.data);
  }

  yield put(actions.updateCardSetSuccess(newCardSet));
}

// watcher saga for action UPDATE_CARD_SET_REQUEST
function* watchUpdateCardSet() {
  yield takeLatest(actions.Types.UPDATE_CARD_SET_REQUEST, updateCardSet);
}

const cardSetSagas = [fork(watchUpdateCardSet)];

export default cardSetSagas;
