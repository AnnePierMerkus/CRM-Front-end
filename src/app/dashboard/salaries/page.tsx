"use client";

import { EmployeeAllSalariesTable } from "@/components/employees/Table/EmployeeAllSalariesTable";
import NavBar from "@/components/general/NavBar/NavBar";
import { getEmployeeSalaries } from "@/services/employee/EmployeeSalaryService";
import { EmployeeSalaryMonthType } from "@/types/employeeSalaryType";
import { Card } from "antd";
import { useEffect, useState } from "react";

export default function Page() {
    const [salaries, setSalaries] = useState<EmployeeSalaryMonthType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getEmployeeSalaries().then((res): void => {
            console.debug(res);
            setIsLoading(false);
            setSalaries(res);
        });
    }, []);

    if (isLoading) {
        return;
    }

    return (
        <>
            <NavBar title="Salaries" />
            <Card>
                <EmployeeAllSalariesTable salaries={salaries} />
            </Card>
        </>
    );
}
