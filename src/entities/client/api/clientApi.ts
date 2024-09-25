import { IOrder } from '@/entities';
import { rtkApi } from '@/shared/api/rtkApi';
import { IOrderPost, IOrderUpdate } from '../models/types/clientTypes';

const clientApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query<IOrder[], void>({
            query: () => ({
                url: 'order/',
                method: 'GET',
            }),
            providesTags: ['order'],
        }),
        getOrder: build.query<IOrder, number>({
            query: (id) => ({
                url: `order/${id}`,
                method: 'GET',
            }),
            providesTags: ['order'],
        }),
        createOrder: build.mutation<IOrder, IOrderPost>({
            query: (body) => ({
                url: 'order/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['order', 'table'],
        }),
        updateOrder: build.mutation<IOrder, IOrderUpdate>({
            query: ({ order_id, ...rest }) => ({
                url: `order/${order_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['order', 'table'],
        }),
    }),
});

export const useGetOrders = clientApi.useGetOrdersQuery;
export const useGetOrder = clientApi.useGetOrderQuery;
export const createOrder = clientApi.useCreateOrderMutation;
export const updateOrder = clientApi.useUpdateOrderMutation;
