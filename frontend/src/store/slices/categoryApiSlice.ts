import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthCheck from "../baseQueryWithAuthCheck";
import { HttpMethod } from "../../constants";
import type { CategoryResponse, CategoryListResponse, CategoryFormData, CategoryUpdateData } from "../../types/category";


export const categoryApiSlice = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQueryWithAuthCheck,
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        // Get all categories
        getCategories: builder.query<CategoryResponse[], void>({
            query: () => ({
                url: "/categories/",
                method: HttpMethod.GET,
            }),
            transformResponse: (response: CategoryListResponse) => response.data,
            providesTags: ["Category"],
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
            invalidatesTags: ["Category"],
        }),

        // Update category
        updateCategory: builder.mutation<CategoryResponse, CategoryUpdateData>({
            query: (category) => ({
                url: `/categories/${category.id}/`,
                method: HttpMethod.PUT,
                body: category,
            }),
            invalidatesTags: ["Category"],
        }),

        // Delete category
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categories/${id}/`,
                method: HttpMethod.DELETE,
            }),
            invalidatesTags: ["Category"],
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