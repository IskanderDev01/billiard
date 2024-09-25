export interface IOrderProduct {
    product_id: number;
    product_name: string;
    price: number;
}

export interface IOrderOption {
    option_id: number;
    option_name: string;
    price: number;
}

export interface IOrder {
    id: number;
    table_id: number;
    table_name: string;
    table_status: boolean;
    start_time: string;
    products: IOrderProduct[];
    options: IOrderOption[];
    end_time: string;
    duration: number;
    total: number;
    date: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface IOrderPost {
    table_id: number;
    status: boolean;
}

export interface IOrderUpdate {
    order_id: number;
    products: number[];
    options: number[];
    status: boolean;
}
