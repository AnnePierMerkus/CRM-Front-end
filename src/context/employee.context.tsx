import {EmployeeType} from "@/types/employeeType";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getEmployees} from "@/services/employee/EmployeeService";

type EmployeeData = {
    employees: EmployeeType[],
    isLoading: boolean,
    showFormModal: boolean,
    toggleShowFormModal: () => void,
    updateEmployee: (employee?: EmployeeType, id?: string) => void,
}

const defaultValues: EmployeeData = {
    employees: [],
    isLoading: true,
    showFormModal: false,
    toggleShowFormModal: (): void => {
    },
    updateEmployee: (employee?: EmployeeType, id?: string): void => {
    },
}

const EmployeeContext = createContext<EmployeeData>(defaultValues);

export function EmployeeProvider({children}: {children: React.ReactNode}) {
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
        getEmployees().then(r => {
            setEmployees(r)
            setLoading(false)
        })
    }, []);
    
    const toggleShowFormModal = () => {
        setShowFormModal(!showFormModal)
    }

    const updateEmployee = (employee?: EmployeeType, id?: string) => {
        if (employee !== undefined) {
            if (id === undefined) {
                setEmployees((prevEmployees) => [...prevEmployees, employee]);
            } else {
                setEmployees((prevEmployees) => [...prevEmployees.map(prevEmployee => {
                    {
                        if (prevEmployee.ID === id) {
                            return employee
                        }
                        return prevEmployee;
                    }
                })])
            }
        } else {
            setEmployees((prevEmployees) =>
                [...prevEmployees.filter(prevEmployee => prevEmployee.ID !== id)])
        }
    }


    return (
        <EmployeeContext.Provider
            value={{employees, isLoading, showFormModal, toggleShowFormModal, updateEmployee}}>
            {children}
        </EmployeeContext.Provider>
    )
}

export const useEmployeeContext = () => useContext(EmployeeContext)
