import {
    getEmployee,
    getEmployeeBookings,
    getEmployeeInvoices,
} from "@/services/employee/EmployeeService";
import { EmployeeType } from "@/types/employeeType";
import { EmployeeBookingType } from "@/types/employeeBookingType";
import { createContext, useContext, useEffect, useState } from "react";
import { EmployeeWageType } from "@/types/employeeWageType";
import { getEmployeeWages } from "@/services/employee/EmployeeWageService";
import { getEmployeeSalaries } from "@/services/employee/EmployeeSalaryService";
import { EmployeeSalaryMonthType, EmployeeSalaryType } from "@/types/employeeSalaryType";

type SingleEmployeeData = {
    employee: EmployeeType | undefined;
    invoices: EmployeeBookingType[] | undefined;
    bookings: EmployeeBookingType[] | undefined;
    getWages: (reload?: boolean) => EmployeeWageType[] | undefined;
    getSalaries: (reload?: boolean) => EmployeeSalaryMonthType[] | undefined;
    setEmployee: (id: string) => void;
    isLoading: boolean;
};

const defaultValues: SingleEmployeeData = {
    employee: undefined,
    invoices: undefined,
    bookings: undefined,
    getWages: () => undefined,
    getSalaries: () => undefined,
    setEmployee: () => { },
    isLoading: true,
};

const SingleEmployeeContext = createContext<SingleEmployeeData>(defaultValues);

export function SingleEmployeeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [employee, setEmployee] = useState<EmployeeType>();
    const [invoices, setInvoices] = useState<EmployeeBookingType[]>();
    const [bookings, setBookings] = useState<EmployeeBookingType[]>();
    const [wages, setWages] = useState<EmployeeWageType[]>();
    const [salaries, setSalaries] = useState<EmployeeSalaryMonthType[]>();
    const [employeeID, setEmployeeID] = useState<string>();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (employeeID !== undefined) {
            getEmployee(employeeID)
                .then((employee) => {
                    setEmployee(employee);
                })
                .finally(() => {
                    // getEmployeeInvoices(employeeID)
                    //     .then((invoices) => {
                    //         console.debug(invoices);
                    //         setInvoices(invoices);
                    //     })
                    //     .finally(() => {
                    //         getEmployeeBookings(employeeID)
                    //             .then((bookings) => {
                    //                 console.debug(bookings);
                    //                 setBookings(bookings);
                    //             })
                    //             .finally(() => {
                    //                 setLoading(false);
                    //             });
                    //     });
                });
        }
    }, [employeeID]);

    const getWages = (reload?: boolean) => {
        if (employeeID === undefined) {
            return undefined;
        }
        if ((wages === undefined || reload )&& isLoading === false) {
            setLoading(true);
            getEmployeeWages(employeeID)
                .then((wages) => {
                    setWages(wages);
                }).finally(() => {
                    setLoading(false);
                })
            return undefined
        }

        return wages;
    }

    const getSalaries = () => {
        if (employeeID === undefined) {
            return undefined;
        }
        if (salaries === undefined && isLoading === false) {
            setLoading(true);
            getEmployeeSalaries(employeeID)
                .then((salaries: EmployeeSalaryMonthType[]) => {
                    setSalaries(salaries);
                    console.debug(salaries);
                })
                .finally(() => {
                    setLoading(false);
                });
            return undefined;
        }
    
        return salaries;
    
    };

    return (
        <SingleEmployeeContext.Provider
            value={{ employee, getWages, getSalaries, isLoading, setEmployee: setEmployeeID, invoices, bookings }}
        >
            {children}
        </SingleEmployeeContext.Provider>
    );
}

export const useSingleEmployeeContext = () => useContext(SingleEmployeeContext);
