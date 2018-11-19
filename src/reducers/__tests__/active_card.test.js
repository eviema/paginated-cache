import ActiveCardReducer from '../reducer_active_card';
import { Types } from '../../actions/index';

it ('handles actions of type TOGGLE_CARD', () => {
    const action = {
        type: Types.TOGGLE_CARD,
        payload: {
            card: {id: '2'},
            isSelected: true
        }
    };
    const newstate = ActiveCardReducer({
        card: null,
        isSelected: false
    }, action);

    expect (newstate).toEqual({
        card: {id: '2'},
        isSelected: true
    });
});