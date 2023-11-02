export interface EmployeeType {
    ID: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address?: EmployeeAddressType
}

export interface EmployeeAddressType {
    line1: string;
    city: string;
    zip: string;
    country: string;
}
