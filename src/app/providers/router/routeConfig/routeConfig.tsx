import { LoginForm } from '@/features/auth';
import { Admin, Products, ProductOptions } from '@/pages/admin';
import { Client } from '@/pages/client';
import { NotFoundPage } from '@/pages/NotFoundPage/ui';
import { AppRoutesProps } from '@/shared/types/router';
import { Sidebar } from '@/widgets/sidebar/Sidebar';

export enum AppRoutes {
    CLIENT = 'client',
    ADMIN = 'admin',
    PRODUCTS = 'products',
    PRODUCTOPTIONS = 'productoptions',
    LOGIN = 'login',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.CLIENT]: '/',
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.PRODUCTS]: '/admin/products',
    [AppRoutes.PRODUCTOPTIONS]: '/admin/productoptions',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.CLIENT]: {
        path: RoutePath.client,
        element: <Client />,
        text: 'Главная',
        authOnly: false,
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <Sidebar children={<Admin />} />,
        text: 'Отчет',
        authOnly: false,
    },
    [AppRoutes.PRODUCTS]: {
        path: RoutePath.products,
        element: <Sidebar children={<Products />} /> ,
        authOnly: false,
    },
    [AppRoutes.PRODUCTOPTIONS]: {
        path: RoutePath.productoptions,
        element: <Sidebar children={<ProductOptions />} />
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginForm />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
