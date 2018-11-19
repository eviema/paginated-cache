import { Types } from '../actions/index';

const INITIAL_STATE = {
    activePageNumber: 0,
    lastPageNumber: 0
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.UPDATE_ACTIVE_PAGE_NUMBER: 
            return { 
                ...state, 
                activePageNumber: action.payload,
            };             
        case Types.SET_LAST_PAGE_NUMBER: 
            return { 
                ...state, 
                lastPageNumber: action.payload,
            }   
        default:
            return state;
    }
}