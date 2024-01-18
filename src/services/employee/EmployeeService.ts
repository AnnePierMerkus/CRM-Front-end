import axios from "axios";
import { API_URL, TOKEN } from "@/services/ApiService";
import { EmployeeType } from "@/types/employeeType";
import { EmployeeAddFormType } from "@/components/employees/Form/EmployeeAddFormSchema";
import moment from "moment";
import { EmployeeBookingType } from "@/types/employeeBookingType";

export async function getEmployees(): Promise<EmployeeType[]> {
    const response = await axios.get(API_URL + "/user", { headers: { 'Authorization': 'Bearer ' + TOKEN } });

    if (response?.data?.success) {
        // @ts-ignore
        return response?.data?.users?.map(user => {
            return {
                ID: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                address: user.address ? {
                    line1: user.address.line1,
                    city: user.address.city,
                    zip: user.address.zip,
                    country: user.address.country,
                } : undefined,
            }
        })
    }
    return []
}

export async function createEmployee(data: EmployeeAddFormType) {
    const response = await axios.post(API_URL + "/user/create", data, { headers: { 'Authorization': 'Bearer ' + TOKEN } });
    return {
        ID: response?.data?.user?._id,
        firstName: response?.data?.user?.firstName,
        lastName: response?.data?.user?.lastName,
        phoneNumber: response?.data?.user?.phoneNumber,
        address: response?.data?.user?.address ? {
            line1: response?.data?.user?.address?.line1,
            city: response?.data?.user?.address?.city,
            zip: response?.data?.user?.address?.zip,
            country: response?.data?.user?.address?.country,
        } : undefined,
    }
}

export async function getEmployee(id: string): Promise<EmployeeType> {
    const response = await axios.get(API_URL + "/user/" + id, { headers: { 'Authorization': 'Bearer ' + TOKEN } });
    return {
        ID: response?.data?._id,
        email: response?.data?.email,
        firstName: response?.data?.firstName,
        lastName: response?.data?.lastName,
        phoneNumber: response?.data?.phoneNumber,
        address: response?.data?.address ? {
            line1: response?.data?.address?.line1,
            city: response?.data?.address?.city,
            zip: response?.data?.address?.zip,
            country: response?.data?.address?.country,
        } : undefined,
    }
}

export async function getEmployeeInvoices(id: string): Promise<EmployeeBookingType[]> {
    const response = await axios.get(API_URL + "/user/" + id + "/invoices", { headers: { 'Authorization': 'Bearer ' + TOKEN } });
    return response?.data?.map((invoice: any) => {
        return {
            ID: invoice?._id,
            start: moment(invoice?.start),
            end: moment(invoice?.end),
            customer: {
                ID: invoice?.customer?._id,
                firstName: invoice?.customer?.firstName,
                lastName: invoice?.customer?.lastName,
                phoneNumber: invoice?.customer?.phoneNumber,
            },
            type: {
                ID: invoice?.type?._id,
                name: invoice?.type?.name,
                price: invoice?.type?.price,
            },
        }
    });
}

export async function getEmployeeBookings(id: string): Promise<any> {
    const response = await axios.get(API_URL + "/user/" + id + "/appointments", { headers: { 'Authorization': 'Bearer ' + TOKEN } });
    return response?.data?.map((invoice: any) => {
        return {
            ID: invoice?._id,
            start: moment(invoice?.start),
            end: moment(invoice?.end),
            customer: {
                ID: invoice?.customer?._id,
                firstName: invoice?.customer?.firstName,
                lastName: invoice?.customer?.lastName,
                phoneNumber: invoice?.customer?.phoneNumber,
            },
            type: {
                ID: invoice?.type?._id,
                name: invoice?.type?.name,
                price: invoice?.type?.price,
            },
        }
    });
}