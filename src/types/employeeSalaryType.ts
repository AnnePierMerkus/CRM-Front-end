export interface EmployeeSalaryType {
    id: number;
    employeeId: number;
    salary: number;
    date: Date;
    amount: number;
}


export interface EmployeeSalaryMonthType {
    employeeId?: string;
    name?: string;
    month: number;
    year: number;
    amount: number;
    salaries: EmployeeSalaryType[];
}