import { Types } from '../actions/index';

const INITIAL_STATE = {
    cache: [],
    numberOfPages: 0,
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
            const numberOfPages = Math.ceil(initCache.length / 12);
            
            return { 
                ...state, 
                cache: initCache, 
                numberOfPages: numberOfPages,
            };  
        }
        case Types.UPDATE_CACHE_REQUEST: {
            return {
                ...state,
            }
        }
        case Types.UPDATE_CACHE_SUCCESS: {
            
            const nextCacheToMerge = action.payload.nextCacheToMerge;
            const newCache = [...state.cache, ...nextCacheToMerge];
            console.log(newCache);
            const numberOfPages = Math.ceil(newCache.length / 12);
            
            return { 
                ...state, 
                cache: newCache, 
                numberOfPages: numberOfPages,
            };  
        }
        case Types.INFORM_CACHING_ERROR: {
            console.log(action.payload.error);
            return {
                ...state,
                error: action.payload.error
            }
        }
        default:
            return state;
    }
}