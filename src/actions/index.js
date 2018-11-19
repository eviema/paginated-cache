
export const Types = {  
    FETCH_INIT_CACHE_REQUEST: 'fetch_init_cache_request',
    FETCH_INIT_CACHE_SUCCESS: 'fetch_init_cache_success',
    TOGGLE_CARD: 'toggle_card',
    UPDATE_CARD_SET_REQUEST: 'update_card_set_request',
    UPDATE_CARD_SET_SUCCESS: 'update_card_set_success',
    UPDATE_PAGE_NUMBER: 'update_page_number',
    UPDATE_CACHE_REQUEST: 'update_cache_request',
    UPDATE_CACHE_SUCCESS: 'update_cache_success',
    INFORM_CACHING_ERROR: 'inform_caching_error',
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

export function updateCardSetRequest(newPageNumber) {

    return {
        type: Types.UPDATE_CARD_SET_REQUEST,
        payload: { 
            newPageNumber,
        }
    };
};

export function updateCardSetSuccess(newCardSet) {

    return {
        type: Types.UPDATE_CARD_SET_SUCCESS,
        payload: { 
            newCardSet,
        }
    };
};

export function updatePageNumber(newPageNumber) {
    return {
        type: Types.UPDATE_PAGE_NUMBER,
        payload: {
            newPageNumber
        }
    }
}

export function updateCacheRequest() {
    return {
        type: Types.UPDATE_CACHE_REQUEST,
    }
};

export function updateCacheSuccess(newCache) {

    return {
        type: Types.UPDATE_CACHE_SUCCESS,
        payload: { 
            newCache,
        }
    };
};

export const informCachingError = ({error}) => ({
    type: Types.INFORM_CACHING_ERROR,
    payload: {
        error
    }
});

