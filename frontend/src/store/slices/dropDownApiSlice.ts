import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthCheck from "../baseQueryWithAuthCheck";
import { HttpMethod } from "../../constants";
import type { DropDownListApiResponse, DropDownListData } from "../../types/dropDown";

export const dropDownApiSlice = createApi({
    reducerPath: "dropDownApi",
    baseQuery: baseQueryWithAuthCheck,
    tagTypes: ["DropDown"],
    endpoints: (builder) => ({
        // Get dropdown data for vendors and products
        getDropDownListData: builder.query<DropDownListData, void>({
            query: () => ({
                url: "/products/get_dropdown_data/",
                method: HttpMethod.GET,
            }),
            transformResponse: (response: DropDownListApiResponse) => response.data,
            providesTags: ["DropDown"],
        }), 
    }),
});

export const {
    useGetDropDownListDataQuery,
} = dropDownApiSlice;