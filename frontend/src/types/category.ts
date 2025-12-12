export interface CategoryResponse {
    id: number;
    name: string;
    description?: string;
}

export interface CategoryFormData {
    id?: number;
    name: string;
    description?: string;
}