
import type{ Vendor } from "./product";


export interface VendorProduct  {
    id: number;
    vendor_code: string;
    vendor_detail?: Vendor | null;
    price: number,
    cost: number,
    stock: number,
    is_active: boolean,
    product: number,
    vendor: number
}


export interface VendorProductFormValues  {
    vendor_code: string;
    price: number | string,
    cost: number | string,
    stock: number | string,
    product: number | string,
    vendor: number | string
}

export interface VendorProductUpdateValues extends VendorProductFormValues {
    id: number
}



