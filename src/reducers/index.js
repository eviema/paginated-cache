import { combineReducers } from 'redux';
import ActiveCardReducer from './reducer_active_card';
import ActiveCardSetReducer from './reducer_active_card_set';
import ActivePageNumberReducer from './reducer_active_page_number';
import CardCacheReducer from './reducer_card_cache';
import LoadingReducer from './reducer_loading';

export default combineReducers({
    activeCard: ActiveCardReducer,
    activeCardSet: ActiveCardSetReducer,
    activePageNumber: ActivePageNumberReducer,
    cardCache: CardCacheReducer,
    loading: LoadingReducer,
});