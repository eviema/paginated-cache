import LoadingReducer from '../reducer_loading';
import { Types } from '../../actions/index';

it ('handles actions of type FETCH_INIT_CACHE_REQUEST', () => {
    const action = {
        type: Types.FETCH_INIT_CACHE_REQUEST
    };
    const newstate = LoadingReducer(false, action);

    expect (newstate).toEqual(true);
});

it ('handles actions of type FETCH_INIT_CACHE_SUCCESS', () => {
    const action = {
        type: Types.FETCH_INIT_CACHE_SUCCESS,
        payload: {
            initCache: [{id: '1'}, {id: '2'}],
            initCardSet: [{id: '1'}]
        }
    };
    const newstate = LoadingReducer(true, action);

    expect (newstate).toEqual(false);
});

it ('handles actions of type UPDATE_CACHE_REQUEST', () => {
    const action = {
        type: Types.UPDATE_CACHE_REQUEST
    };
    const newstate = LoadingReducer(false, action);

    expect (newstate).toEqual(true);
});

it ('handles actions of type UPDATE_CACHE_SUCCESS', () => {
    const action = {
        type: Types.UPDATE_CACHE_SUCCESS,
        payload: {
            nextCacheToMerge: [{id: '1'}, {id: '2'}]
        }
    };
    const newstate = LoadingReducer(true, action);

    expect (newstate).toEqual(false);
});