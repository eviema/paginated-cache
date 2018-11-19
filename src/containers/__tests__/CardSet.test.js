import React from 'react';
import { mount } from 'enzyme';

import CardSet from '../CardSet';
import Root from '../../Root';


let wrapped;

it ('shows active card set', () => {
    
    wrapped = mount(
        <Root>
            <CardSet />
        </Root>
    );
    
    expect (wrapped.exists('#card-set')).toEqual(true);
});

afterEach(() => {
    wrapped.unmount();
});
