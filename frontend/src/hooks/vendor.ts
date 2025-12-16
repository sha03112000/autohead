import {
    useGetVendorsQuery,
    useCreateVendorMutation,
    useUpdateVendorMutation,
    useDeleteVendorMutation
} from '../store/slices/vendorApiSlice';

export function useVendorData(page: number) {
    const { data, isLoading, isError } = useGetVendorsQuery({ page });
    const [createVendor, { isLoading: isCreating }] = useCreateVendorMutation();
    const [updateVendor, { isLoading: isUpdating }] = useUpdateVendorMutation();
    const [deleteVendor, { isLoading: isDeleting }] = useDeleteVendorMutation();

    return {
        data, isLoading, isError,

        isCreating, createVendor,

        isUpdating, updateVendor,
        
        isDeleting, deleteVendor
    };
}