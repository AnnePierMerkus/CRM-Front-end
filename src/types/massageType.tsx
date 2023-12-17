export interface MassageType {
    ID: string;
    name: string;
    price: number;
    newPrice?: number | null;
    activationDate?: string | null;
}