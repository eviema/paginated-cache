import { Types } from '../actions/index';

const INITIAL_STATE = {
    cache: [],
    numberOfPages: 0,
    loading: false
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.FETCH_INIT_CACHE_SUCCESS: {
            
            const initCache = action.payload.initCache;
            const numberOfPages = Math.ceil(initCache.length / 12);
            
            return { 
                ...state, 
                cache: initCache, 
                numberOfPages: numberOfPages,
                loading: false };  
        }
        case Types.UPDATE_CACHE: {
            
            const newCache = action.payload.newCache;
            const numberOfPages = Math.ceil(newCache.length / 12);
            
            return { 
                ...state, 
                cache: newCache, 
                numberOfPages: numberOfPages,
                loading: false };  
        }
        default:
            return state;
    }
}