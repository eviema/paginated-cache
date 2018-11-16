import { Types } from '../actions/index';

const INITIAL_STATE = {
    card: null,
    isSelected: false
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case Types.TOGGLE_CARD: {
            return {
                ...state,
                card: action.payload.card,
                isSelected: action.payload.isSelected
            };
        }             
            
        default:
            return state;
    }
}