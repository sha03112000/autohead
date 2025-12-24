import { useCreateVendorProductMutation } from "../store/slices/vendorProductsApiSlice";

export const useVendorProductData = () => {

    const [createVendorProductData, { isLoading: isCreating }] = useCreateVendorProductMutation();

    return {
        createVendorProductData, isCreating
    }
}




