export interface Debit {
    id: number;
    name: string;
    value: number;
    categoryId: number | null;
    moment: Date;
}