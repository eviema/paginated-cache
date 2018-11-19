import React from 'react';
import { mount } from 'enzyme';

import SingleCard from '../SingleCard';
import Root from '../../Root';


let wrapped;

it ('shows a card', () => {
    const cardData = {
        state: '',
        number: '',
        application: '',
        assignee: '',
        shortDescription: '',
        made_sla: '',
        upon_reject: '',
        opened_by: '',
        priority: '',
        activity_due: '',
        approval: '',
    };

    wrapped = mount(
        <Root>
            <SingleCard cardData={cardData}/>
        </Root>
    );
    
    expect (wrapped.exists('#card')).toEqual(true);
});

afterEach(() => {
    wrapped.unmount();
});
