import { takeEvery, takeLatest, call, 
    fork, put, select} from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as api from '../api/cache';
import mapCards from './helper';

// worker saga to update current cache
// when user clicks to go to a page that is not in current cache
function* updateCache(){

    try {
        // get the latest page number requested
        const getActivePageNumber = (state) => state.pageNumbers.activePageNumber;
        const activePageNumber = yield select(getActivePageNumber);

        // calculate params for api call
        // fetch 8 pages on each subsequent request   
        
        const pageNumberRequestedInEndpoint = Math.ceil((activePageNumber + 1)/ 8) - 1;
        
        let nextApiCallParams, numbersOfPagesToMap; 
        // if page requested is between 5 and 8
        if (pageNumberRequestedInEndpoint === 0) {
            nextApiCallParams = {
                page: 1,
                perPage: 48, 
            };
            numbersOfPagesToMap = Array.from(new Array(4), (x,i) => i + 4);
        } else {
            nextApiCallParams = {
                page: pageNumberRequestedInEndpoint,
                perPage: 96, 
            };
            numbersOfPagesToMap = [...Array(8).keys()];
        }

        // fetch new cache to add
        const dataFetched = yield call(
            api.getNextCache, 
            nextApiCallParams
        ); 

        // preprocess data
        const dataPreprocessed = mapCards(dataFetched.data);

        // add page numbers to data
        const cacheToMerge = numbersOfPagesToMap.map(page => {
            const pageNumberInCache = pageNumberRequestedInEndpoint * 8 + page + 1;
            
            const cardStartIndex = numbersOfPagesToMap.length === 4 ? (page - 4) * 12: page * 12;
            const cardEndIndex = numbersOfPagesToMap.length === 4 ? (page - 3) * 12: (page + 1) * 12; 
            
            const cardsOnPage = dataPreprocessed.slice(cardStartIndex, cardEndIndex);
            return {  pageNumberInCache, cardsOnPage };
        });
        
        // update current cache
        yield put(actions.updateCacheSuccess(cacheToMerge));
    } catch (error) {
        yield put(actions.informCachingError({
            error: 'An error occurred when trying to update the cache.'
        }));
    }
   
}

// watcher saga for action UPDATE_CACHE_REQUEST
function* watchUpdateCache(){ 
    yield takeLatest(actions.Types.UPDATE_CACHE_REQUEST, updateCache);
}

// worker saga to fetch initial cache
function* fetchInitCache(){ 

    try {
        const initCacheResponse = yield call(api.getInitCache);
        let initCache = initCacheResponse.data;
        
        initCache = mapCards(initCache);

        initCache = [...Array(4).keys()].map(page => {
            const pageNumberInCache = page + 1;
            const cardsOnPage = initCache.slice(page * 12, (page + 1) * 12);
            return {  pageNumberInCache, cardsOnPage };
        });

        const initCardSet = initCache[0].cardsOnPage;
        yield put(actions.fetchInitCacheSuccess(initCache, initCardSet));
        
        const totalCountOfCardsInEndpoint = initCacheResponse.headers["x-total-count"];
        const totalNumberOfPagesInEndpoint = Math.ceil(totalCountOfCardsInEndpoint / 12)
        
        yield put(actions.updateActivePageNumber(1));
        yield put(actions.setLastPageNumber(totalNumberOfPagesInEndpoint));


   } catch(e) {
       yield put(actions.informCachingError({
           error: 'An error occurred when trying to fetch initial data.'
       }));
   }
}

// watcher saga for action FETCH_INIT_CACHE_REQUEST
function* watchInitCache(){
    yield takeEvery(actions.Types.FETCH_INIT_CACHE_REQUEST, fetchInitCache);
}

const cacheSagas = [
    fork(watchUpdateCache),
    fork(watchInitCache),
];

export default cacheSagas;