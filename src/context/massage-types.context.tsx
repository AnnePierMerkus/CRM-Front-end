import {MassageType} from "@/types/massageType";
import React, {createContext, useContext, useEffect, useState} from "react";
import {EmployeeType} from "@/types/employeeType";
import {getEmployees} from "@/services/employee/EmployeeService";
import {getMassageTypes} from "@/services/massage-types/MassageTypesService";

type MassageTypeData = {
    massageTypes: MassageType[],
    isLoading: boolean,
    showFormModal: boolean,
    toggleShowFormModal: () => void,
}

const defaultValues: MassageTypeData = {
    massageTypes: [],
    isLoading: true,
    showFormModal: false,
    toggleShowFormModal: (): void => {
    },
}

const MassageTypeContext = createContext<MassageTypeData>(defaultValues);

export function MassageTypeProvider({children}: {children: React.ReactNode}) {
    const [massageTypes, setMassageTypes] = useState<MassageType[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
        getMassageTypes().then(r => {
            setMassageTypes(r)
            setLoading(false)
        })
    }, []);


    const toggleShowFormModal = () => {
        setShowFormModal(!showFormModal)
    }

    return (
        <MassageTypeContext.Provider
            value={{massageTypes, isLoading, showFormModal, toggleShowFormModal}}>
            {children}
        </MassageTypeContext.Provider>
    )
}
export const useMassageTypeContext = () => useContext(MassageTypeContext);
