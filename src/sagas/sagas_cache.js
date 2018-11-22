import { takeEvery, takeLatest, call, 
    fork, put, select} from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as api from '../api/cache';

// helper to preprocess card data
const mapCards = (cards) => {
    return cards.map(card => {
        card = {...card.coreData, ...card.serviceData}

        return {
            state: card.state,
            number: card.number,
            application: card.application,
            assignee: card.assignee,
            shortDescription: card.shortDescription,
            made_sla: card.made_sla,
            upon_reject: card.upon_reject,
            opened_by: card.opened_by,
            priority: card.priority,
            activity_due: card.activity_due,
            approval: card.approval
        };
    });
}

// worker saga to update active card set
function* updateCardSet(action) {
   
    let newCardSet;

    // get the latest page number user has requested
    const activePageNumber = action.payload;

    const getCache = (state) => state.cardCache;
    const currentCache = yield select(getCache);
    const pageNumbersInCache = currentCache.pageNumbers;
    const cardCache = currentCache.cache;

    // if page requested is in cache
    if (pageNumbersInCache.includes(activePageNumber)) {
        var i;
        for (i = 0; i < cardCache.length; i++) { 
            if (cardCache[i].pageNumberInCache === activePageNumber) {
                newCardSet = cardCache[i].cardsOnPage;
                i = cardCache.length;
            }
        }
    } 
    // if page requested not in cache
    // fetch new active card set via an api call
    else {
        // calculate the params (i.e. page, perPage) needed for api call
        const nextApiCallParams = {
            page: activePageNumber - 1,
            perPage: 12,
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
function* watchUpdateCardSet(){ 
    yield takeLatest(actions.Types.UPDATE_CARD_SET_REQUEST, updateCardSet);
}

// worker saga to update current cache
// when user clicks to go to a page that is not in current cache
function* updateCache(){

    try {
        // get the latest page number requested
        const getActivePageNumber = (state) => state.pageNumbers.activePageNumber;
        const activePageNumber = yield select(getActivePageNumber);

        // calculate params for api call
        // fetch 8 pages on each subsequent request   
        
        const pageNumberRequestedInEndpoint = Math.ceil(activePageNumber / 8) - 1;
        
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
    fork(watchUpdateCardSet),
    fork(watchUpdateCache),
    fork(watchInitCache),
];

export default cacheSagas;