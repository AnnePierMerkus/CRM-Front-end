import axios from "axios";
import { API_URL, TOKEN } from "../ApiService";

export async function getEmployeeSalaries(id: string) {
    const response = await axios.get(API_URL + "/employee-salary?employee=" + id, { headers: { 'Authorization': 'Bearer ' + TOKEN } });
    if (response?.data?.success) {
        return response?.data?.employeeSalaries?.map((salary: any) => {
            return {
                ID: salary._id,
                type: salary.type,
                amount: salary.amount,
                activeFrom: salary.activeFrom,
                isActive: salary.isActive,
            }
        })
    }
    return []

}