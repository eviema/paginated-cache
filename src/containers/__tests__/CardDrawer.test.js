import React from 'react';
import { mount } from 'enzyme';

import CardDrawer from '../CardDrawer';
import Root from '../../Root';


let wrapped;

afterEach(() => {
    wrapped.unmount();
});

it ('shows drawer when a card is selected', () => {
    const initialState = {
        activeCard: {
            card: {id: '1'},
            isSelected: true
        }
    };

    wrapped = mount(
        <Root initialState={initialState}>
            <CardDrawer />
        </Root>
    );
    
    expect (wrapped.exists('#drawer')).toEqual(true);
});

it ('hides drawer when a card is unselected', () => {
    const initialState = {
        activeCard: {
            card: {id: '1'},
            isSelected: false
        }
    };

    wrapped = mount(
        <Root initialState={initialState}>
            <CardDrawer />
        </Root>
    );
    
    expect (wrapped.exists('#drawer')).toEqual(false);
});
