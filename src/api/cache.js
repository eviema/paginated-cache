import axios from 'axios';

let pageNumber = 0,
    requestParams = {
        ticketType: 'incident',
        sortDirection: 'DESC',
        page: pageNumber,
        perPage: 48
    };

export const getInitCache = () => {

    return axios.get('/tickets', {
        params: requestParams
    });
};

export function getNextCache(currentCacheLength) {

    pageNumber = currentCacheLength / 48;
    return axios.get('/tickets', {
        params: requestParams
    });
};