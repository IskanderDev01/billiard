/* eslint-disable @typescript-eslint/no-explicit-any */
import { rtkApi } from '@/shared/api/rtkApi';
import { LoginResponse } from '..'

const authApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, FormData>({
            query: (formData) => ({ 
                url: `auth/jwt/login`,
                method: 'POST',
                body: formData,
            }),
        }),
        getMe: build.query<any, void>({
            query: () => ({
                url: 'authenticated-route',
                method: 'GET',
            }),
        }),
        logout: build.mutation<unknown, void>({
            query: () => ({
                url: 'auth/jwt/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const useLogin = authApi.useLoginMutation;
export const useGetMeLazy = authApi.useLazyGetMeQuery;
export const useLogout = authApi.useLogoutMutation;
