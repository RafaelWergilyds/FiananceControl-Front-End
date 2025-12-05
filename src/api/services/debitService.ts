import { api } from "../api"

export interface Debit {
    id: number;
    name: string;
    amount: number;
    moment: Date;
    categoryId: number | null;
}

export const debitService = {
    getAll: async () => {
        const response = await api.get<Debit[]>('/debits')
        return response
    },

    create: async (data: Omit<Debit, 'id' | 'moment'>) => {
        const response = await api.post<Debit>('/debits', data)
        return response.data;
    },

    update: async (data: Omit<Debit, 'id' | 'moment'>) => {
        const response = await api.post<Debit>('/debits', data)
        return response.data
    },

    delete: async (id: number) => {
        const response = await api.delete<Debit>(`/debits/${id}`)
        return response
    }
}