import {MassageType} from "@/types/massageType";
import React, {createContext, useContext, useEffect, useState} from "react";
import {EmployeeType} from "@/types/employeeType";
import {getEmployees} from "@/services/employee/EmployeeService";
import {getMassageTypes} from "@/services/massage-types/MassageTypesService";
import {CustomerType} from "@/types/customerType";

type MassageTypeData = {
    massageTypes: MassageType[],
    isLoading: boolean,
    showFormModal: boolean,
    toggleShowFormModal: () => void,
    updateMassageType: (massageType?: MassageType, id?: string) => void,
    getMassageType: (id: string) => MassageType | undefined

}

const defaultValues: MassageTypeData = {
    massageTypes: [],
    isLoading: true,
    showFormModal: false,
    toggleShowFormModal: (): void => {
    },
    updateMassageType: (massageType?: MassageType, id?: string): void => {
    },
    getMassageType: (id: string): MassageType | undefined => {return undefined}

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


    const getMassageType = (id: string): MassageType | undefined => {
        return massageTypes.find(c => c.ID === id)
    }
    const toggleShowFormModal = () => {
        setShowFormModal(!showFormModal)
    }

    const updateMassageType = (massageType?: MassageType, id?: string) => {
        if (massageType !== undefined) {
            if (id === undefined) {
                setMassageTypes((prevMassageTypes) => [...prevMassageTypes, massageType]);
            } else {
                setMassageTypes((prevMassageTypes) => [...prevMassageTypes.map(prevMassageType => {
                    {
                        if (prevMassageType.ID === id) {
                            return massageType
                        }
                        return prevMassageType;
                    }
                })])
            }
        } else {
            setMassageTypes((prevMassageTypes) =>
                [...prevMassageTypes.filter(prevMassageType => prevMassageType.ID !== id)])
        }
    }

    return (
        <MassageTypeContext.Provider
            value={{massageTypes, isLoading, showFormModal, toggleShowFormModal, updateMassageType, getMassageType}}>
            {children}
        </MassageTypeContext.Provider>
    )
}
export const useMassageTypeContext = () => useContext(MassageTypeContext);
