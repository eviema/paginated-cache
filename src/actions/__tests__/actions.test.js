import * as actions from '../index';

describe('fetchInitCacheRequest', () => {
    it ('has the correct type', () => {
        const action = actions.fetchInitCacheRequest();
        expect (action.type).toEqual(actions.Types.FETCH_INIT_CACHE_REQUEST);
    });
});

describe('fetchInitCacheSuccess', () => {
    it ('has the correct type', () => {
        const action = actions.fetchInitCacheSuccess();
        expect (action.type).toEqual(actions.Types.FETCH_INIT_CACHE_SUCCESS);
    });

    it ('has the correct payload', () => {
        const action = actions.fetchInitCacheSuccess(
            [{id: '1'}, {id: '2'}], [{id: '1'}]
        );
        expect (action.payload).toEqual({
            initCache: [{id: '1'}, {id: '2'}],
            initCardSet: [{id: '1'}]
        });
    });
});

describe('updateActivePageNumber', () => {
    it ('has the correct type', () => {
        const action = actions.updateActivePageNumber();
        expect (action.type).toEqual(actions.Types.UPDATE_ACTIVE_PAGE_NUMBER);
    });

    it ('has the correct payload', () => {
        const action = actions.updateActivePageNumber(1);
        expect (action.payload).toEqual(1);
    });
});

describe('setLastPageNumber', () => {
    it ('has the correct type', () => {
        const action = actions.setLastPageNumber();
        expect (action.type).toEqual(actions.Types.SET_LAST_PAGE_NUMBER);
    });

    it ('has the correct payload', () => {
        const action = actions.setLastPageNumber(195);
        expect (action.payload).toEqual(195);
    });
});

describe('toggleCard', () => {
    it ('has the correct type', () => {
        const action = actions.toggleCard();
        expect (action.type).toEqual(actions.Types.TOGGLE_CARD);
    });

    it ('has the correct payload', () => {
        const action = actions.toggleCard({id: '1'}, true);
        expect (action.payload).toEqual({
            card: { id: '1'},
            isSelected: true
        });
    });
});

describe('updateCardSetRequest', () => {
    it ('has the correct type', () => {
        const action = actions.updateCardSetRequest();
        expect (action.type).toEqual(actions.Types.UPDATE_CARD_SET_REQUEST);
    });

    it ('has the correct payload', () => {
        const action = actions.updateCardSetRequest(2);
        expect (action.payload).toEqual(2);
    });
});

describe('updateCardSetSuccess', () => {
    it ('has the correct type', () => {
        const action = actions.updateCardSetSuccess();
        expect (action.type).toEqual(actions.Types.UPDATE_CARD_SET_SUCCESS);
    });

    it ('has the correct payload', () => {
        const action = actions.updateCardSetSuccess([{id: '2'}]);
        expect (action.payload).toEqual([{id: '2'}]);
    });
});

describe('updateCacheRequest', () => {
    it ('has the correct type', () => {
        const action = actions.updateCacheRequest();
        expect (action.type).toEqual(actions.Types.UPDATE_CACHE_REQUEST);
    });
});

describe('updateCacheSuccess', () => {
    it ('has the correct type', () => {
        const action = actions.updateCacheSuccess();
        expect (action.type).toEqual(actions.Types.UPDATE_CACHE_SUCCESS);
    });

    it ('has the correct payload', () => {
        const action = actions.updateCacheSuccess([{id: '2'}]);
        expect (action.payload).toEqual([{id: '2'}]);
    });
});

describe('informCachingError', () => {
    it ('has the correct type', () => {
        const action = actions.informCachingError();
        expect (action.type).toEqual(actions.Types.INFORM_CACHING_ERROR);
    });

    it ('has the correct payload', () => {
        const action = actions.informCachingError('error');
        expect (action.payload).toEqual('error');
    });
});