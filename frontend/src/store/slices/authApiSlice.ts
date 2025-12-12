import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthCheck from "../baseQueryWithAuthCheck";
import type { AuthTokenResponse, LoginRequest } from "../../types/auth";
import { HttpMethod } from "../../constants";


export const authApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithAuthCheck,
    endpoints: (builder) => ({
        login: builder.mutation<AuthTokenResponse, LoginRequest>({
            query: (credentials) => ({
                url: "login/",
                method: HttpMethod.POST,
                body: credentials,
            }),
        })
    }),
});

export const { useLoginMutation } = authApiSlice;