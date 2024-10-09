import { rtkApi } from '@/shared/api/rtkApi';
import {
    IOptionForm,
    // IReportDaily,
    // IReportTable,
    IReportTable,
    ITableForm,
    IUser,
    IUserForm,
} from '../models/types/adminTypes';

const adminApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createProduct: build.mutation<undefined, FormData>({
            query: (formData) => ({
                url: 'product/',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['product'],
        }),
        updateProduct: build.mutation<undefined, FormData>({
            query: (formData) => ({
                url: `product/${formData.get('product_id')}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['product'],
        }),
        deleteProduct: build.mutation<undefined, number>({
            query: (id) => ({
                url: `product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product'],
        }),
        createOption: build.mutation<undefined, IOptionForm>({
            query: (body) => ({
                url: 'option/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['option'],
        }),
        updateOption: build.mutation<undefined, IOptionForm>({
            query: ({ option_id, ...rest }) => ({
                url: `option/${option_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['option'],
        }),
        deleteOption: build.mutation<undefined, number>({
            query: (id) => ({
                url: `option/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['option'],
        }),
        createTable: build.mutation<undefined, ITableForm>({
            query: (body) => ({
                url: 'table/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['table'],
        }),
        updateTable: build.mutation<undefined, ITableForm>({
            query: ({ id, ...rest }) => ({
                url: `table/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['table'],
        }),
        deleteTable: build.mutation<undefined, number>({
            query: (id) => ({
                url: `table/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['table'],
        }),
        createUser: build.mutation<undefined, IUserForm>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['user'],
        }),
        updateUser: build.mutation<undefined, IUserForm>({
            query: ({ id, ...rest }) => ({
                url: `auth/update/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['user'],
        }),
        deleteUser: build.mutation<undefined, number>({
            query: (id) => ({
                url: `auth/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['user'],
        }),
        getUsers: build.query<IUser[], void>({
            query: () => ({
                url: 'auth/users',
                method: 'GET',
            }),
            providesTags: ['user'],
        }),
        getUser: build.query<IUser, number>({
            query: (id) => ({
                url: `auth/user/${id}`,
                method: 'GET',
            }),
            providesTags: ['user'],
        }),
        // getReportDaily: build.query<IReportDaily[], string>({
        //     query: (date) => ({
        //         url: `report/daily?daily_report_date=${date}`,
        //         method: 'GET',
        //     }),
        // }),
        getReportTables: build.query<IReportTable[], string>({
            query: (date) => ({
                url: `report/table?daily_report_date=${date}`,
                method: 'GET',
            }),
        }),
    }),
});

export const createProduct = adminApi.useCreateProductMutation;
export const deleteProduct = adminApi.useDeleteProductMutation;
export const updateProduct = adminApi.useUpdateProductMutation;
export const createOption = adminApi.useCreateOptionMutation;
export const updateOption = adminApi.useUpdateOptionMutation;
export const deleteOption = adminApi.useDeleteOptionMutation;
export const createTable = adminApi.useCreateTableMutation;
export const updateTable = adminApi.useUpdateTableMutation;
export const deleteTable = adminApi.useDeleteTableMutation;
export const createUser = adminApi.useCreateUserMutation;
export const updateUser = adminApi.useUpdateUserMutation;
export const deleteUser = adminApi.useDeleteUserMutation;
export const useGetUsers = adminApi.useGetUsersQuery;
export const useGetUser = adminApi.useGetUserQuery;
// export const useGetReportDily = adminApi.useGetReportDailyQuery;
export const useGetReportTables = adminApi.useGetReportTablesQuery;
