export interface MassageType {
    id: string;
    name: string;
    price: number;
    newPrice?: number | null;
    activationDate?: string | null;
}