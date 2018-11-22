import axios from 'axios';

let requestParams = {
        ticketType: 'incident',
        sortDirection: 'DESC',
        page: 0,
        perPage: 0
    };

export const getInitCache = () => {

    requestParams ={
        ...requestParams,
        perPage: 48
    }
    return axios.get('/tickets', {
        params: requestParams
    });
};

export function getNextCache({ page, perPage }) {
    requestParams ={
        ...requestParams,
        page, perPage
    }
    return axios.get('/tickets', {
        params: requestParams
    });
};