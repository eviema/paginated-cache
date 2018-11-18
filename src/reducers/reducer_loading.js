import { Types } from '../actions/index';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        // case Types.START_LOADING: 
        //     return true;
        // case Types.STOP_LOADING: 
        //     return false;
        case Types.FETCH_INIT_CACHE_REQUEST:
            return true;
        case Types.FETCH_INIT_CACHE_SUCCESS:
            return false;
        case Types.UPDATE_CACHE_REQUEST:
            return true;
        case Types.UPDATE_CACHE_SUCCESS:
            return false;
        default:
            return state;
    }
}