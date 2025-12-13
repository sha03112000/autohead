export interface CategoryResponse {
    id: number;
    name: string;
    description?: string;
}

export interface CategoryListResponse {
    success: boolean;
    message: string;
    data: CategoryResponse[];
}

export interface CategoryFormData {
    name: string;
    description?: string;
}

export interface CategoryUpdateData {
    id: number;
    name: string;
    description?: string;
}



