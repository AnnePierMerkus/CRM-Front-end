export interface CustomerType {
    ID: string, // todo: remove ID
    firstName: string,
    lastName: string,
    phoneNumber: string,
    // lastEmployee: string,
    // lastType: string,
    // options: string
}

export interface SelectedCustomerType {
    data?: CustomerType,
    ID: string
}
