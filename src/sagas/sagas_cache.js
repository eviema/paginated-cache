import { takeEvery, call, fork, put, select} from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as api from '../api/cache';



// worker saga to update active card set
function* updatePage(action) {
    const newPageNumber = action.payload.newPageNumber;

    const getCache = (state) => state.cardCache;
    let currentCache = yield select(getCache);
    const totalNumberOfPagesInCache = currentCache.numberOfPages;
    
    if (newPageNumber === totalNumberOfPagesInCache - 1) {
        const nextCacheToMerge = yield call(api.getNextCardCache);
        const newCache = currentCache.cache.concat(nextCacheToMerge);
        yield put(actions.updateCache(newCache));
    }

    const newCardSet = currentCache.cache.slice(
        (newPageNumber - 1 ) * 12, 
        newPageNumber * 12
    );

    yield put(actions.updatePageSuccess(newCardSet));

}

// watcher saga for action UPDATE_PAGE_REQUEST
function* watchUpdatePage(){ 
    yield takeEvery(actions.Types.UPDATE_PAGE_REQUEST, updatePage);
}

function* fetchInitCache(){    
    const initCache = yield call(api.getInitCardCache);
    const initCardSet = initCache.slice(0, 12);
    yield put(actions.fetchInitCacheSuccess(initCache, initCardSet));
}

function* watchInitCache(){
    yield takeEvery(actions.Types.FETCH_INIT_CACHE_REQUEST, fetchInitCache);
}


const cacheSagas = [
    fork(watchUpdatePage),
    fork(watchInitCache),
];

export default cacheSagas;