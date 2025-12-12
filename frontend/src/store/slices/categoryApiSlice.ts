import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthCheck from "../baseQueryWithAuthCheck";
import { HttpMethod } from "../../constants";
import type { CategoryResponse, CategoryFormData } from "../../types/category";


export const categoryApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithAuthCheck,
    endpoints: (builder) => ({
        // Get all categories
        getCategories: builder.query<CategoryResponse[], void>({
            query: () => ({
                url: "/categories/",
                method: HttpMethod.GET,
            }),
        }),

        // Get category by id
        getCategoriesById: builder.query<CategoryResponse, number>({
            query: (id) => ({
                url: `/categories/${id}/`,
                method: HttpMethod.GET,
            }),
        }),

        // Create category
        createCategory: builder.mutation<CategoryResponse, CategoryFormData>({
            query: (category) => ({
                url: "/categories/",
                method: HttpMethod.POST,
                body: category,
            }),
        }),

        // Update category
        updateCategory: builder.mutation<CategoryResponse, CategoryFormData>({
            query: (category) => ({
                url: `/categories/${category.id}/`,
                method: HttpMethod.PUT,
                body: category,
            }),
        }),

        // Delete category
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categories/${id}/`,
                method: HttpMethod.DELETE,
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoriesByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApiSlice;