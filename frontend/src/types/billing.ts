
export interface BillFormItem {
    vendor_product: number;
    quantity: number;
    selling_price: number;
}

export interface BillFormValues {
    customer_name?: string;
    items : BillFormItem[];
    discount?: number;
}