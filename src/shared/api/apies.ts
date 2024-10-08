import { IOption, IProduct, ITable } from '../types/apiesTypes';
import { rtkApi } from './rtkApi';

const apies = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTables: build.query<ITable[], void>({
            query: () => ({
                url: 'table/',
                method: 'GET',
            }),
            providesTags: ['table', 'order']
        }),
        getTable: build.query<ITable, number>({
            query: (id) => ({
                url: `table/${id}`,
                method: 'GET',
            }),
        }),
        getProducts: build.query<IProduct[], void>({
            query: () => ({
                url: 'product/',
                method: 'GET',
            }),
            providesTags: ['product']
        }),
        getProduct: build.query<IProduct, number>({
            query: (id) => ({
                url: `product/${id}`,
                method: 'GET',
            }),
        }),
        getOptions: build.query<IOption[], void>({
            query: () => ({
                url: 'option/',
                method: 'GET',
            }),
            providesTags: ['option']
        }),
        getOption: build.query<IOption, number>({
            query: (id) => ({
                url: `option/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const useGetTables = apies.useGetTablesQuery;
export const useGetTable = apies.useGetTableQuery;
export const useGetProducts = apies.useGetProductsQuery;
export const useGetProduct = apies.useGetProductQuery;
export const useGetOptions = apies.useGetOptionsQuery;
export const useGetOption = apies.useGetOptionQuery;
