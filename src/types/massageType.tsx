export interface MassageType {
    ID: string;
    name: string;
    price: number;
}

export interface MassageTypePrice {
    price: number;
    activeFrom: moment.Moment;
}