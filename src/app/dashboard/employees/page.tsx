'use client';

import Row from "@/components/general/Row/Row";
import {EmployeeCard} from "@/components/employees/Card/EmployeeCard";
import Column from "@/components/general/Column/Column";
import {useEmployeeContext} from "@/context/employee.context";
import { EmployeeFormModal } from "@/components/employees/Form/EmployeeFormModal";
import { Button } from "antd";

export default function Employees() {
    const {employees, toggleShowFormModal} = useEmployeeContext();
    return <>
        <Button type="primary" onClick={toggleShowFormModal}>Open</Button>
        <Row>
            {
                employees.map((employee, index) => {
                    return <Column size={"1/4"} key={index}>
                        <EmployeeCard {...employee} />
                    </Column>
                })
            }
        </Row>
        <EmployeeFormModal />
    </>
}
