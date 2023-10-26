'use client';

import {EmployeeType} from "@/types/employeeType";
import Row from "@/components/general/Row/Row";
import {EmployeeCard} from "@/components/employees/Card/EmployeeCard";
import Column from "@/components/general/Column/Column";

export default function Employees() {


    const employees: EmployeeType[] = [...Array(6)].map((x, i) => {
        return {
            ID: i,
            firstname: `firstname ${i}`,
            lastname: `lastname ${i}`,
            phoneNumber: "+31 6 45069892"
        }
    })
    return <Row>
        {
            employees.map((employee, index) => {
                return <Column size={"1/4"} key={index}>
                    <EmployeeCard {...employee} />
                </Column>
            })
        }
    </Row>
}
