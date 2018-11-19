import ActiveCardSetReducer from '../reducer_active_card_set';
import { Types } from '../../actions/index';

it ('handles actions of type FETCH_INIT_CACHE_SUCCESS', () => {
    const action = {
        type: Types.FETCH_INIT_CACHE_SUCCESS,
        payload: {
            initCache: [{id: '1'}, {id: '2'}],
            initCardSet: [{id: '1'}]
        }        
    };
    const newstate = ActiveCardSetReducer([], action);

    expect (newstate).toEqual([{id: '1'}]);
});

it ('handles actions of type UPDATE_CARD_SET_SUCCESS', () => {
    const action = {
        type: Types.UPDATE_CARD_SET_SUCCESS,
        payload: [{id: '1'}, {id: '2'}]
    };
    const newstate = ActiveCardSetReducer([{id: '3'}, {id: '4'}], action);

    expect (newstate).toEqual([{id: '1'}, {id: '2'}]);
});
