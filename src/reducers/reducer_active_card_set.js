import { Types } from '../actions/index';

const INITIAL_STATE = {
    cardSet: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.UPDATE_PAGE_SUCCESS: {
            return {
                ...state,
                cardSet: action.payload.newCardSet
            };
        }             
        case Types.FETCH_INIT_CACHE_SUCCESS: {
            return {
                ...state,
                cardSet: action.payload.initCardSet
            };
        }    
        default:
            return state;
    }
};