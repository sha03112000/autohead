import { useCreateBillMutation, useGetBillsQuery } from "../store/slices/billingApiSlice";


export const useBillingData = () => {

    const { data, isLoading, isError } = useGetBillsQuery();
    const [createBill, { isLoading: isCreating }] = useCreateBillMutation();

    return {
        data, isLoading, isError,
        isCreating, createBill
    };
}