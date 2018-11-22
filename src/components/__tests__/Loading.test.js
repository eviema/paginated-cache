import React from 'react';
import { mount } from 'enzyme';

import Loading from '../Loading';
import Root from '../../Root';


let wrapped;

afterEach(() => {
    wrapped.unmount();
});

describe('on initial load request', () => {
    
    beforeEach(() => {

        const initialState = {
            loading: true,
            pageNumbers: {
                activePageNumber: 0,
                lastPageNumber: 0
            },
        };
    
        wrapped = mount(
            <Root initialState={initialState}>
                <Loading />
            </Root>
        );
    });
    
    it ('shows a loading gif', () => {
        expect (wrapped.find('img').length).toEqual(1);
    });

    it ('shows loading text', () => {
        expect (wrapped.find('h1').length).toEqual(1);
    });

});

describe('on initial load success', () => {
    
    beforeEach(() => {

        const initialState = {
            loading: false,
            pageNumbers: {
                activePageNumber: 1,
                lastPageNumber: 195
            },
        };
    
        wrapped = mount(
            <Root initialState={initialState}>
                <Loading />
            </Root>
        );
    });
    
    it ('hides the loading gif', () => {
        expect (wrapped.find('img').length).toEqual(0);
    });

    it ('hides loading text', () => {
        expect (wrapped.find('h1').length).toEqual(0);
    });

});

describe('on subsequent cache request', () => {
    
    beforeEach(() => {

        const initialState = {
            loading: true,
            pageNumbers: {
                activePageNumber: 5,
                lastPageNumber: 195
            },
            cardCache: {
                cache: [],
                numberOfPages: 4
            }
        };
    
        wrapped = mount(
            <Root initialState={initialState}>
                <Loading />
            </Root>
        );
    });
    
    it ('shows a loading gif', () => {
        expect (wrapped.find('img').length).toEqual(1);
    });

    it ('shows loading text', () => {
        expect (wrapped.find('h1').length).toEqual(1);
    });

});

describe('on subsequent cache success', () => {
    
    beforeEach(() => {

        const initialState = {
            loading: false,
            pageNumbers: {
                activePageNumber: 5,
                lastPageNumber: 195
            },
            cardCache: {
                cache: [],
                numberOfPages: 12
            }
        };
    
        wrapped = mount(
            <Root initialState={initialState}>
                <Loading />
            </Root>
        );
    });
    
    it ('hides a loading gif', () => {
        expect (wrapped.find('img').length).toEqual(0);
    });

    it ('hides loading text', () => {
        expect (wrapped.find('h1').length).toEqual(0);
    });

});
