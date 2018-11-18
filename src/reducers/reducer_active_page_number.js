import { Types } from '../actions/index';

const INITIAL_STATE = 0;

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.UPDATE_PAGE_NUMBER: {

            return action.payload.newPageNumber;
        }             
            
        default:
            return state;
    }
}