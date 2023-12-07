import { HTMLFieldProps, connectField } from "uniforms";
import { SelectField } from "./SelectField";
import { useEffect, useState } from "react";
import { getEmployees } from "@/services/employee/EmployeeService";

type EmployeeSelectProps = HTMLFieldProps<string, HTMLDivElement>;

function EmployeeSelect({ onChange, value }: EmployeeSelectProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [options, setOptions] = useState<
        { value: string; label: string }[] | undefined
    >();

    useEffect(() => {
        getEmployees()
            .then((r) => {
                setOptions(
                    r.map((employee) => ({
                        value: employee.ID,
                        label: employee.firstName + " " + employee.lastName,
                    }))
                );
                setIsLoading(false);
            })
            .catch(() => {
                setOptions(undefined);
                setIsLoading(false);
            });
    }, []);

    return (
        <SelectField
            value={value}
            onChange={onChange}
            options={options}
            isLoading={isLoading}
            label="Employee"
        />
    );
}

export const EmployeeSelectField = connectField(EmployeeSelect);
