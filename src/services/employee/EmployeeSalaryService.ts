import axios from "axios";
import { API_URL, TOKEN } from "../ApiService";
import { EmployeeSalaryMonthType } from "@/types/employeeSalaryType";

export async function getEmployeeSalaries(id?: string): Promise<EmployeeSalaryMonthType[]> {
    const response = await axios.get(id ? API_URL + "/employee-salary?employee=" + id : API_URL + "/employee-salary", { headers: { 'Authorization': 'Bearer ' + TOKEN } });
    if (!response?.data?.success) {
        return [];
    }

    const salaries = response.data.employeeSalaries;
    const monthlySalaries: EmployeeSalaryMonthType[] = [];

    salaries.forEach((salary: any) => {
        const date = new Date(salary.date);
        const month = date.getMonth();
        const year = date.getFullYear();

        const existingSalary = monthlySalaries.find((monthlySalary: EmployeeSalaryMonthType) => {
            return monthlySalary.month === month && monthlySalary.year === year && monthlySalary.employeeId === salary.employee._id;
        });

        if (existingSalary) {
            existingSalary.amount += salary.amount;
        } else {
            monthlySalaries.push({
                employeeId: salary.employee._id,
                month,
                year,
                amount: salary.amount,
                salaries: [],
                name: salary.employee.firstName + " " + salary.employee.lastName
            });
        }
    });

    return monthlySalaries;
}