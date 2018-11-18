import { takeEvery, call, 
    fork, put, select} from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as api from '../api/cache';


// function* updatePageNumber(action) {
    
//     const getLoadingStatus = (state) => state.loading;
//     const loading = yield select(getLoadingStatus);

//     if (loading) {
//         // stop updating page number if loading (initial or subsequent updates)
//     }

    
// }

// function* watchUpdatePageNumber() {
//     yield takeEvery(actions.Types.UPDATE_PAGE_NUMBER, updatePageNumber);
// }

// worker saga to update active card set
function* updateCardSet(action) {

    const newPageNumber = action.payload.newPageNumber;

    const getCache = (state) => state.cardCache;
    const currentCache = yield select(getCache);

    let newCardSet = currentCache.cache.slice(
        (newPageNumber - 1 ) * 12, 
        newPageNumber * 12
    );

    newCardSet = newCardSet.map(card => {
                
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

    yield put(actions.updateCardSetSuccess(newCardSet));

}

// watcher saga for action UPDATE_CARD_SET_REQUEST
function* watchUpdateCardSet(){ 
    yield takeEvery(actions.Types.UPDATE_CARD_SET_REQUEST, updateCardSet);
}

// worker saga to update current cache
function* updateCache(){

    const getCache = (state) => state.cardCache;
    const currentCache = yield select(getCache);
    const currentCacheLength = currentCache.cache.lenth;

    const getActivePageNumber = (state) => state.activePageNumber;
    const activePageNumber = yield select(getActivePageNumber);

    try {        
        // fetch next cache consisting of two parts, 
        // given 8 more pages to load
        const nextCacheToMergePart1 = yield call(
            api.getNextCache, 
            currentCacheLength
        ); 
        const nextCacheToMergePart2 = yield call(
            api.getNextCache, 
            currentCacheLength + 48
        );
        
        const nextCacheToMergePending = 
            nextCacheToMergePart1.data.concat(
            nextCacheToMergePart2.data
        );
        const nextCacheToMerge = nextCacheToMergePending.map(card => {
            
            // repeated code: move out as separate logic
            const coreData = card.coreData,
                serviceData = card.serviceData;

                return {
                    state: coreData.state,
                    number: coreData.number,
                    application: coreData.application,
                    assignee: coreData.assignee,
                    shortDescription: coreData.shortDescription,
                    made_sla: serviceData.made_sla,
                    upon_reject: serviceData.upon_reject,
                    opened_by: serviceData.opened_by,
                    priority: serviceData.priority,
                    activity_due: serviceData.activity_due,
                    approval: serviceData.approval
                };
        });
        
        const newCache = currentCache.cache.concat(nextCacheToMerge);
        yield put(actions.updateCacheSuccess(newCache));
        yield put(actions.updateCardSetRequest(activePageNumber));
    } 
    catch (e) {
        yield put(actions.informCachingError({
            error: 'An error occurred when trying to update the cache.'
        }));
    }   

}

// watcher saga for action UPDATE_CACHE_REQUEST
function* watchUpdateCache(){ 
    yield takeEvery(actions.Types.UPDATE_CACHE_REQUEST, updateCache);
}

// worker saga to fetch initial cache
function* fetchInitCache(){ 

    try {
        const initCacheResponse = yield call(api.getInitCache);
        let initCache = initCacheResponse.data;
        initCache = initCache.map(card => {
            const coreData = card.coreData,
                  serviceData = card.serviceData;

            return {
                state: coreData.state,
                number: coreData.number,
                application: coreData.application,
                assignee: coreData.assignee,
                shortDescription: coreData.shortDescription,
                made_sla: serviceData.made_sla,
                upon_reject: serviceData.upon_reject,
                opened_by: serviceData.opened_by,
                priority: serviceData.priority,
                activity_due: serviceData.activity_due,
                approval: serviceData.approval
            };
        });

        const initCardSet = initCache.slice(0, 12);
        yield put(actions.fetchInitCacheSuccess(initCache, initCardSet));
        yield put(actions.updatePageNumber(1));
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
    // fork(watchUpdatePageNumber),
    fork(watchUpdateCardSet),
    fork(watchUpdateCache),
    fork(watchInitCache),
];

export default cacheSagas;