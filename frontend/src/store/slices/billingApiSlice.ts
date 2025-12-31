import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthCheck from "../baseQueryWithAuthCheck";
import { HttpMethod } from "../../constants";
import type { BillFormValues } from "../../types/billing";

export const billingApiSlice = createApi({
    reducerPath: "billingApi",
    baseQuery: baseQueryWithAuthCheck,
    tagTypes: ["Billing"],
    endpoints: (builder) => ({
        // create Bill
        createBill: builder.mutation<void, BillFormValues>({
            query: (bill) => ({
                url: "/billing/",
                method: HttpMethod.POST,
                body: bill,
            }),
        }), 

    })
});

export const {
    useCreateBillMutation,
} = billingApiSlice