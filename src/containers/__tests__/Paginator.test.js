import React from 'react';
import { mount } from 'enzyme';

import Paginator from '../Paginator';
import Root from '../../Root';


let wrapped;

it ('shows paginator', () => {
    
    wrapped = mount(
        <Root>
            <Paginator />
        </Root>
    );
    
    expect (wrapped.exists('#paginator')).toEqual(true);
});

afterEach(() => {
    wrapped.unmount();
});
