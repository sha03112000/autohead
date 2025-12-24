import {
    useGetDropDownListDataQuery
} from "../store/slices/dropDownApiSlice";


export function useDropDownData() {
    
    const { data, isLoading, isError } = useGetDropDownListDataQuery();

    return {
        data, isLoading, isError
    };

}
