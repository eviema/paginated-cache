import { Types } from '../actions/index';

const INITIAL_STATE = {
    cache: [],
    pageNumbers: [],
    error: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.FETCH_INIT_CACHE_REQUEST: {
            return {
                ...state
            }
        }
        case Types.FETCH_INIT_CACHE_SUCCESS: {
            
            const initCache = action.payload.initCache;
            const pageNumbers = initCache.map(page => {
                return page.pageNumberInCache
            });

            return { 
                ...state, 
                cache: initCache, 
                pageNumbers,
            };  
        }
        case Types.UPDATE_CACHE_REQUEST: {
            return {
                ...state,
            }
        }
        case Types.UPDATE_CACHE_SUCCESS: {
            
            const cacheToMerge = action.payload;
            const newCache = [...state.cache, ...cacheToMerge];
            const pageNumbers = newCache.map(page => {
                return page.pageNumberInCache
            });

            return { 
                ...state, 
                cache: newCache, 
                pageNumbers
            };  
        }
        case Types.INFORM_CACHING_ERROR: {
            // console.log(action.payload);
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            return state;
    }
}