import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseURL = 'http://127.0.0.1:8000/';
export const baseURLPORT = 'http://127.0.0.1:8000';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token') || '';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-type', 'application/json');
            headers.set('Accept', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['order', 'table', 'product', 'option', 'user'],
    endpoints: () => ({}),
});
