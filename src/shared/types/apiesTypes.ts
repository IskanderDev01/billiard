export interface ITable {
    name: string;
    status: boolean;
    price: number;
    id: number;
    created_at: string;
    updated_at: string;
}

export interface IOption {
    sort_order: number;
    name: string;
    created_at: string;
    id: number;
    price: number;
    product_id: number;
    updated_at: string;
}

export interface IProduct {
    description: string;
    id: number;
    status: boolean;
    sort_order: number;
    created_at: string;
    name: string;
    price: number;
    image: string;
    updated_at: string;
    options: IOption[];
}
