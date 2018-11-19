import { combineReducers } from 'redux';
import ActiveCardReducer from './reducer_active_card';
import ActiveCardSetReducer from './reducer_active_card_set';
import pageNumbersReducer from './reducer_page_numbers';
import CardCacheReducer from './reducer_card_cache';
import LoadingReducer from './reducer_loading';

export default combineReducers({
    activeCard: ActiveCardReducer,
    activeCardSet: ActiveCardSetReducer,
    pageNumbers: pageNumbersReducer,
    cardCache: CardCacheReducer,
    loading: LoadingReducer,
});