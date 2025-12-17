import type{ VendorFormData } from "../types/vendor"

export interface FlatVendorForm {
  name: string;
  email: string;
  phone: string | number;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  gst_number?: string;
  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;
  branch_name?: string;
}



export const mapVendorFormToPayload = (
  data: FlatVendorForm
): VendorFormData => ({
  name: data.name,
  email: data.email,
  phone: data.phone,
  address: data.address,
  city: data.city,
  state: data.state,
  pincode: data.pincode,
  gst_number: data.gst_number,
  bank: {
    bank_name: data.bank_name,
    account_number: data.account_number,
    ifsc_code: data.ifsc_code,
    branch_name: data.branch_name,
  },
});