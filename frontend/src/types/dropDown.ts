
import type{ Product, Vendor } from "./product";

type ProductBasic = Pick<Product, 'id' | 'product_name'>;
export interface DropDownListData  {
    products : ProductBasic[];
    vendors : Vendor[];
}

export interface DropDownListApiResponse  {
    success: boolean;
    message: string;
    data: DropDownListData;
}