export interface Debit {
    id: number;
    name: string;
    amount: number;
    categoryId: number | null;
    moment: Date;
}