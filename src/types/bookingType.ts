import {EmployeeAddressType, EmployeeType} from "@/types/employeeType";
import {CustomerType} from "@/types/customerType";

export interface BookingType {
    _id: string,
    start: Date,
    end: Date,
    customer: CustomerType,
    type: BookingTypeType,
}

export interface BookingTypeType {
    name: string
}


export interface EmployeeBookingsType  {
    employee: EmployeeType
    bookings?: BookingType[]
}
