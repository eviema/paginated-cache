import { Types } from '../actions/index';

const INITIAL_STATE = {
    pageNumber: 1
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.UPDATE_PAGE_REQUEST: {

            return {
                ...state,
                pageNumber: action.payload.newPageNumber
            };
        }             
            
        default:
            return state;
    }
}