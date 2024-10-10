import { IOrder } from '@/entities';
import { rtkApi } from '@/shared/api/rtkApi';
import {
    IOrderPost,
    IOrderUpdate,
    IRealHistoryData,
} from '../models/types/clientTypes';

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
        updateOrderProductCancel: build.mutation<IOrder, IOrderUpdate>({
            query: ({ order_id, ...rest }) => ({
                url: `order/cancel/${order_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['order', 'table'],
        }),
        getReportCloseSission: build.query<unknown, void>({
            query: () => ({
                url: 'report/close_session',
                method: 'GET',
            }),
        }),
        getReportSessionHistory: build.query<IRealHistoryData[], void>({
            query: () => ({
                url: 'report/session_history',
                method: 'GET',
            }),
            providesTags: ['order', 'table'],
        }),
        getReportCheck: build.mutation<unknown, number>({
            query: (id) => ({
                url: `report/print_check?order_id=${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const useGetOrders = clientApi.useGetOrdersQuery;
export const useGetOrder = clientApi.useGetOrderQuery;
export const createOrder = clientApi.useCreateOrderMutation;
export const updateOrder = clientApi.useUpdateOrderMutation;
export const updateOrderProductCancel =
    clientApi.useUpdateOrderProductCancelMutation;
export const useLazyGetReportCloseSession =
    clientApi.useLazyGetReportCloseSissionQuery;
export const useGetReportSessionHistory =
    clientApi.useGetReportSessionHistoryQuery;
export const useGetReportCheck = clientApi.useGetReportCheckMutation;
