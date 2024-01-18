"use client";

import { useEmployeeContext } from "@/context/employee.context";
import { Button, PageHeader, message } from "antd";
import { EmployeeList } from "@/components/employees/List/EmployeeList";
import { useModalContext } from "@/context/modal.context";
import { EmployeeAddForm } from "@/components/employees/Form/EmployeeAddForm";
import { createEmployee } from "@/services/employee/EmployeeService";
import { EmployeeAddFormType } from "@/components/employees/Form/EmployeeAddFormSchema";
import { EmployeeType } from "@/types/employeeType";
import NavBar from "@/components/general/NavBar/NavBar";
import { useRouter } from 'next/navigation';

export default function Employees() {
    const router = useRouter();

    const { employees, toggleShowFormModal, updateEmployee } =
        useEmployeeContext();
    const { addToStack, removeLastFromStack } = useModalContext();

    const onSubmit = (data: EmployeeAddFormType) => {
        createEmployee(data)
            .then((newEmployee) => {
                updateEmployee(newEmployee as EmployeeType);
                toggleShowFormModal();
                message.success(
                    "Created employee '" +
                    (newEmployee.firstName + " " + newEmployee.lastName) +
                    "'"
                );
                removeLastFromStack();
            })
            .catch((reason) => {
                message.error(reason?.response?.data?.message);
            });
    };

    const viewAction = (employee: EmployeeType) => {
        router.push("/dashboard/employees/" + employee.ID);
    };

    return (
        <>
            <NavBar
                title="Employees"
                extra={[
                    <Button
                        key="1"
                        type="primary"
                        onClick={() =>
                            addToStack(
                                "Create employee",
                                <EmployeeAddForm onSubmit={onSubmit} />
                            )
                        }
                    >
                        Create employee
                    </Button>,
                ]}
            />
            <EmployeeList employees={employees} viewAction={viewAction} />
        </>
    );
}
