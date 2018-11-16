import cacheSagas from './sagas_cache';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    
    yield all([     
        ...cacheSagas                       
    ])
}