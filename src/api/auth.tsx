import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (data?.error) {
            return data.error as string;
        }
        if (data && typeof data === 'object') { const firstKey = Object.keys(data)[0];
            if (firstKey) return `${firstKey}: ${data[firstKey]}`;
            }
            if (error.message){
                return error.message;
            }
    }
    return 'Error inesperado';
}
export default api;