import { Types } from '../actions/index';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.UPDATE_CARD_SET_SUCCESS: {
            return action.payload;
        }             
        case Types.FETCH_INIT_CACHE_SUCCESS: {
            return action.payload.initCardSet;
        }    
        default:
            return state;
    }
};