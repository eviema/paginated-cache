
export const Types = {  
    FETCH_INIT_CACHE_REQUEST: 'fetch_init_cache_request',
    FETCH_INIT_CACHE_SUCCESS: 'fetch_init_cache_success',
    TOGGLE_CARD: 'toggle_card',
    UPDATE_PAGE_REQUEST: 'update_page_request',
    UPDATE_PAGE_SUCCESS: 'update_page_success',
    UPDATE_CACHE: 'update_cache',
};

export const fetchInitCacheRequest = () => ({
    type: Types.FETCH_INIT_CACHE_REQUEST,
});

export function fetchInitCacheSuccess(initCache, initCardSet){
    return {
        type: Types.FETCH_INIT_CACHE_SUCCESS,
        payload: {
            initCache,
            initCardSet
        }
    };
};

export const toggleCard = (card, isSelected) => ({
    type: Types.TOGGLE_CARD,
    payload: {
        card,
        isSelected
    }
});

export function updatePageRequest(newPageNumber) {

    return {
        type: Types.UPDATE_PAGE_REQUEST,
        payload: { 
            newPageNumber,
        }
    };
};

export function updatePageSuccess(newCardSet) {

    return {
        type: Types.UPDATE_PAGE_SUCCESS,
        payload: { 
            newCardSet,
        }
    };
};

export function updateCache(newCache) {

    return {
        type: Types.UPDATE_CACHE,
        payload: { 
            newCache,
        }
    };
};
