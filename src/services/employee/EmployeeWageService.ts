import axios from "axios";
import { API_URL, TOKEN } from "../ApiService";
import { CreateEmployeeWageType } from "@/components/employees/Form/EmployeeWageAddForm";

export async function getEmployeeWages(id: string) {
    const response = await axios.get(API_URL + "/employee-wage?employee=" + id, { headers: { 'Authorization': 'Bearer ' + TOKEN } });
    if (response?.data?.success) {
        return response?.data?.employeeWages?.map((wage: any) => {
            return {
                ID: wage._id,
                type: wage.type,
                amount: wage.amount,
                activeFrom: wage.activeFrom,
                isActive: wage.isActive,
            }
        })
    }
    return []
}

export async function updateEmployeeWage(data: CreateEmployeeWageType, id: string) {
    const response = await axios.post(API_URL + "/employee-wage" , {employee: id, ...data}, { headers: { 'Authorization': 'Bearer ' + TOKEN } });
    return response?.data?.success;
}
