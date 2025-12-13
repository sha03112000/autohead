import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} from '../store/slices/categoryApiSlice';


export function useCategoryData ()  {
    const {data, isLoading, isError} = useGetCategoriesQuery();
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
    
    return { 
        data, isLoading, isError,
        
        createCategory,
        isCreating,
        
        updateCategory,
        isUpdating,
        
        deleteCategory,
        isDeleting
    };
}