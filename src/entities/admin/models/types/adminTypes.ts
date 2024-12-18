import { IOrder } from '@/entities';

export interface AdminSchema {
    reportTableData: IOrder[];
}

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

export interface IReportProductQuantity {
    product_id: string;
    quantity: string;
}

export interface IReportOptionQuantity {
    option_id: string;
    quantity: string;
}

export interface IReportOrderDetails {
    products: IReportProductQuantity[];
    options: IReportOptionQuantity[];
}

export interface IReportTable {
    products: IReportOrderDetails;
    orders: IOrder[];
    date: string;
    total_play_time: number;
    updated_at: string;
    table_name: string;
    table_id: number;
    id: number;
    products_income: number;
    table_income: number;
    total_income: number;
    created_at: string;
}

export interface IReportTableFilter {
    table_id: number;
    table_name: string;
    total_table_income: number;
    total_products_income: number;
    total_income: number;
    total_play_time: number;
    total_entries: number;
}

export interface IReportDaily {
    id: number;
    date: string;
    table_income: number;
    orders: IOrder[];
    products: IReportOrderDetails;
    product_income: number;
    updated_at: string;
    total_income: number;
    total_play_time: number;
    created_at: string;
}
