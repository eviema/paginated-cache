import React from 'react';
import { mount } from 'enzyme';

import App from '../App';
import Root from '../../Root';


let wrapped;

it ('shows a paper background', () => {  
    wrapped = mount(
        <Root><App /></Root>
    );    
    expect (wrapped.exists('#paper')).toEqual(true);
    wrapped.unmount();
});
