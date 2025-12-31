import { useCreateBillMutation } from "../store/slices/billingApiSlice";


export const useBillingData = () => {
    
    const [createBill, { isLoading: isCreating }] = useCreateBillMutation();

    return { isCreating, createBill };
}