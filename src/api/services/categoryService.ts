import { api } from "../api"

export interface Category {
    id: number;
    name: string;
}

export const categoryService = {
    getAll: async () => {
        const response = await api.get<Category[]>('/categories')
        return response
    },

    create: async (data: Omit<Category, 'id' | 'moment'>) => {
        const response = await api.post<Category>('/categories', data)
        return response.data;
    },

    update: async (data: Omit<Category, 'id' | 'moment'>) => {
        const response = await api.post<Category>('/categories', data)
        return response.data
    },

    delete: async (id: number) => {
        const response = await api.delete<Category>(`/categories/${id}`)
        return response
    }
}