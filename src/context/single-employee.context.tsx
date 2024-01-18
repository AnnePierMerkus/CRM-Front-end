import {
    getEmployee,
    getEmployeeBookings,
    getEmployeeInvoices,
} from "@/services/employee/EmployeeService";
import { EmployeeType } from "@/types/employeeType";
import { EmployeeBookingType } from "@/types/employeeBookingType";
import { createContext, useContext, useEffect, useState } from "react";
import { EmployeeSalaryType } from "@/types/employeeSalaryType";
import { getEmployeeSalaries } from "@/services/employee/EmployeeSalaryService";

type SingleEmployeeData = {
    employee: EmployeeType | undefined;
    invoices: EmployeeBookingType[] | undefined;
    bookings: EmployeeBookingType[] | undefined;
    getSalaries: () => EmployeeSalaryType[] | undefined; 
    setEmployee: (id: string) => void;
    isLoading: boolean;
};

const defaultValues: SingleEmployeeData = {
    employee: undefined,
    invoices: undefined,
    bookings: undefined,
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
    const [salaries, setSalaries] = useState<EmployeeSalaryType[]>();
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

    const getSalaries = () => {
        if (employeeID === undefined) {
            return undefined;
        }

        if (salaries === undefined && isLoading === false) {
            setLoading(true);
            getEmployeeSalaries(employeeID)
                .then((salaries) => {
                    setSalaries(salaries);
                }).finally(() => {
                    setLoading(false);
                })
            return undefined
        }

        return salaries;
    }

    return (
        <SingleEmployeeContext.Provider
            value={{ employee, getSalaries, isLoading, setEmployee: setEmployeeID, invoices, bookings }}
        >
            {children}
        </SingleEmployeeContext.Provider>
    );
}

export const useSingleEmployeeContext = () => useContext(SingleEmployeeContext);
