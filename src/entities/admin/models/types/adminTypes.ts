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
