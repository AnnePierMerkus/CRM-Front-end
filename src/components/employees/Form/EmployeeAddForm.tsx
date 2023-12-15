'use client';

import {AutoForm} from "uniforms-antd";
import {EmployeeAddFormType, bridge as schema} from './EmployeeAddFormSchema';
import { createEmployee } from '@/services/employee/EmployeeService';
import { useEmployeeContext } from '@/context/employee.context';
import {message} from "antd";
import {EmployeeType} from "@/types/employeeType";

export const EmployeeAddForm = () => {
    const {updateEmployee, toggleShowFormModal} = useEmployeeContext();

    const onSubmit = (data: EmployeeAddFormType) => {
        createEmployee(data).then(newEmployee => {
            updateEmployee(newEmployee as EmployeeType)
            toggleShowFormModal()
            message.success("Created employee '" + (newEmployee.firstName + " " + newEmployee.lastName) + "'")
        })
    }

    return <AutoForm schema={schema} onSubmit={onSubmit} />
}