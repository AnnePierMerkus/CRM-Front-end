import axios from "axios";
import {API_URL, TOKEN} from "@/services/ApiService";
import {EmployeeType} from "@/types/employeeType";
import { EmployeeAddFormType } from "@/components/employees/Form/EmployeeAddFormSchema";

export async function getEmployees(): Promise<EmployeeType[]> {
    const response = await axios.get(API_URL + "/user", {headers: {'Authorization': 'Bearer ' + TOKEN}});

    if (response?.data?.success) {
        // @ts-ignore
        return response?.data?.users?.map(user => {
            return {
                ID: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
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
    const response = await axios.post(API_URL + "/user/create", data, {headers: {'Authorization': 'Bearer ' + TOKEN}});
    return {
        ID: response?.data?.user?._id,
        firstName: response?.data?.user?.firstName,
        lastName: response?.data?.user?.lastName,
        phoneNumber: response?.data?.user?.phoneNumber,
        address: response?.data?.user?.address ? {
            line1: response?.data?.user?.address?.line1,
            city: response?.data?.user?.address?.address.city,
            zip: response?.data?.user?.address?.address.zip,
            country: response?.data?.user?.address?.address.country,
        } : undefined,
    }
}
