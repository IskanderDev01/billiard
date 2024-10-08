import { LoginForm } from '@/features/auth';
import { Admin, Products, ProductOptions, Tables, User } from '@/pages/admin';
import { Client } from '@/pages/client';
import { NotFoundPage } from '@/pages/NotFoundPage/ui';
import { AppRoutesProps } from '@/shared/types/router';
import { Sidebar } from '@/widgets/sidebar/Sidebar';

export enum AppRoutes {
    CLIENT = 'client',
    ADMIN = 'admin',
    PRODUCTS = 'products',
    PRODUCTOPTIONS = 'productoptions',
    TABLE = 'table',
    USERS = 'users',
    LOGIN = 'login',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.CLIENT]: '/',
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.PRODUCTS]: '/admin/products',
    [AppRoutes.PRODUCTOPTIONS]: '/admin/productoptions',
    [AppRoutes.TABLE]: '/admin/table',
    [AppRoutes.USERS]: '/admin/users',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.CLIENT]: {
        path: RoutePath.client,
        element: <Client />,
        text: 'Главная',
        authOnly: true,
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <Sidebar children={<Admin />} />,
        text: 'Отчет',
        authOnly: true,
    },
    [AppRoutes.PRODUCTS]: {
        path: RoutePath.products,
        element: <Sidebar children={<Products />} />,
        authOnly: true,
    },
    [AppRoutes.PRODUCTOPTIONS]: {
        path: RoutePath.productoptions,
        element: <Sidebar children={<ProductOptions />} />,
        authOnly: true,
    },
    [AppRoutes.TABLE]: {
        path: RoutePath.table,
        element: <Sidebar children={<Tables />} />,
        authOnly: true,
    },
    [AppRoutes.USERS]: {
        path: RoutePath.users,
        element: <Sidebar children={<User />} />,
        authOnly: true,
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
