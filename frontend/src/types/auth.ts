export interface AuthTokenResponse {
    access: string;
    refresh: string;
    is_superuser: boolean;
}

export interface LoginRequest {
    username: string;
    password: string;
}

