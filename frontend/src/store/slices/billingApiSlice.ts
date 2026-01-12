import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthCheck from "../baseQueryWithAuthCheck";
import { HttpMethod } from "../../constants";
import type { BillFormValues, BillingApiResponse, BillListData } from "../../types/billing";

export const billingApiSlice = createApi({
    reducerPath: "billingApi",
    baseQuery: baseQueryWithAuthCheck,
    tagTypes: ["Billing"],
    endpoints: (builder) => ({

        getBills: builder.query<BillListData[], void>({
            query: () => ({
                url: "/billing/",
                method: HttpMethod.GET,
            }),
            transformResponse: (response: BillingApiResponse) => response.data,
            providesTags: ["Billing"],
        }),
        // create Bill
        createBill: builder.mutation<void, BillFormValues>({
            query: (bill) => ({
                url: "/billing/",
                method: HttpMethod.POST,
                body: bill,
            }),
            invalidatesTags : ["Billing"],
        }), 

    })
});

export const {
    useCreateBillMutation,
    useGetBillsQuery
} = billingApiSlice