import { rtkApi } from '@/shared/api/rtkApi';
import { IOptionForm } from '../models/types/adminTypes';

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
    }),
});

export const createProduct = adminApi.useCreateProductMutation;
export const deleteProduct = adminApi.useDeleteProductMutation;
export const updateProduct = adminApi.useUpdateProductMutation;
export const createOption = adminApi.useCreateOptionMutation;
export const updateOption = adminApi.useUpdateOptionMutation;
export const deleteOption = adminApi.useDeleteOptionMutation;
