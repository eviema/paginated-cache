import PageNumbersReducer from '../reducer_page_numbers';
import { Types } from '../../actions/index';

it ('handles actions of type UPDATE_ACTIVE_PAGE_NUMBER', () => {
    const action = {
        type: Types.UPDATE_ACTIVE_PAGE_NUMBER,
        payload: 2
    };
    const newstate = PageNumbersReducer({
        activePageNumber: 1,
        lastPageNumber: 195
    }, action);

    expect (newstate).toEqual({
        activePageNumber: 2,
        lastPageNumber: 195
    });
});

it ('handles actions of type SET_LAST_PAGE_NUMBER', () => {
    const action = {
        type: Types.SET_LAST_PAGE_NUMBER,
        payload: 195
    };
    const newstate = PageNumbersReducer({
        activePageNumber: 0,
        lastPageNumber: 0
    }, action);

    expect (newstate).toEqual({
        activePageNumber: 0,
        lastPageNumber: 195
    });
});