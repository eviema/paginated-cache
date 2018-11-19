import CardCacheReducer from '../reducer_card_cache';
import { Types } from '../../actions/index';

it ('handles actions of type FETCH_INIT_CACHE_REQUEST', () => {
    const action = {
        type: Types.FETCH_INIT_CACHE_REQUEST
    };
    const newstate = CardCacheReducer({
        cache: [],
        numberOfPages: 0,
        error: ''
    }, action);

    expect (newstate).toEqual({ ...newstate });
});

it ('handles actions of type FETCH_INIT_CACHE_SUCCESS', () => {
    const action = {
        type: Types.FETCH_INIT_CACHE_SUCCESS,
        payload: {
            initCache: [{id: '1'}, {id: '2'}],
            initCardSet: [{id: '1'}]
        }
    };
    const newstate = CardCacheReducer({
        cache: [],
        numberOfPages: 0,
        error: ''
    }, action);

    expect (newstate).toEqual({ 
        cache: [{id: '1'}, {id: '2'}],
        numberOfPages: 1,
        error: ''
    });
});

it ('handles actions of type UPDATE_CACHE_REQUEST', () => {
    const action = {
        type: Types.UPDATE_CACHE_REQUEST
    };
    const newstate = CardCacheReducer({
        cache: [{id: '1'}, {id: '2'}],
        numberOfPages: 1,
        error: ''
    }, action);

    expect (newstate).toEqual({ ...newstate });
});

it ('handles actions of type UPDATE_CACHE_SUCCESS', () => {
    const action = {
        type: Types.UPDATE_CACHE_SUCCESS,
        payload: [{id: '3'}, {id: '4'}]
    };
    const newstate = CardCacheReducer({
        cache: [{id: '1'}, {id: '2'}],
        numberOfPages: 1,
        error: ''
    }, action);

    expect (newstate).toEqual({ 
        cache: [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}],
        numberOfPages: 1,
        error: ''
     });
});

it ('handles actions of type INFORM_CACHING_ERROR', () => {
    const action = {
        type: Types.INFORM_CACHING_ERROR,
        payload: 'error'
    };
    const newstate = CardCacheReducer({
        cache: [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}],
        numberOfPages: 1,
        error: ''
    }, action);

    expect (newstate).toEqual({ 
        cache: [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}],
        numberOfPages: 1,
        error: 'error'
     });
});

