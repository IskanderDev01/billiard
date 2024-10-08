import { IOrder } from '@/entities';

export interface IProductForm {
    product_id: number;
    name: string;
    price: number;
    description: string;
    status: boolean;
    sort_order: number;
    image: string;
}

export interface IOptionForm {
    option_id?: number;
    name: string;
    price: number;
    sort_order: number;
    product_id: number;
}

export interface ITableForm {
    id?: number;
    name: string;
    price: number;
    status: boolean;
}

export interface IUserForm {
    id?: number;
    email: string;
    password: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
}

export interface IUser {
    id: number;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
}

interface IReportProductQuantity {
    product_id: string;
    quantity: string;
}

interface IReportOptionQuantity {
    option_id: string;
    quantity: string;
}

interface IReportOrderDetails {
    products: IReportProductQuantity[];
    options: IReportOptionQuantity[];
}

export interface IReportTable {
    products: IReportOrderDetails;
    orders: IOrder[];
    date: string;
    total_play_time: number;
    updated_at: string;
    table_id: number;
    id: number;
    total_income: number;
    created_at: string;
}
