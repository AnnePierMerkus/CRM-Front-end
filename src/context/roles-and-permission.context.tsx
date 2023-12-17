import React, {createContext, useContext, useEffect, useState} from "react";
import {RolesAndPermissionType} from "@/types/roles-and-permission-type";
import {getRolesAndPermission} from "@/services/roles-and-permission/RolesAndPermissionService";

type RolesAndPermissionData = {
    rolesAndPermission: RolesAndPermissionType[],
    isLoading: boolean,
    showFormModal: boolean,
    toggleShowFormModal: () => void,
    updateRolesAndPermission: (RolesAndPermissionType?: RolesAndPermissionType, id?: string) => void,
    getRoleAndPermission: (id: string) => RolesAndPermissionType | undefined

}

const defaultValues: RolesAndPermissionData = {
    rolesAndPermission: [],
    isLoading: true,
    showFormModal: false,
    toggleShowFormModal: (): void => {
    },
    updateRolesAndPermission: (rolesAndPermissionType?: RolesAndPermissionType, id?: string): void => {
    },
    getRoleAndPermission: (id: string): RolesAndPermissionType | undefined => {return undefined}

}

const RolesAndPermissionContext = createContext<RolesAndPermissionData>(defaultValues);

export function RolesAndPermissionProvider({children}: {children: React.ReactNode}) {
    const [rolesAndPermission, setRolesAndPermission] = useState<RolesAndPermissionType[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
        getRolesAndPermission().then(r => {
            setRolesAndPermission(r)
            setLoading(false)
        })
    }, []);


    const getRoleAndPermission = (id: string): RolesAndPermissionType | undefined => {
        return rolesAndPermission.find(c => c.ID === id)
    }
    const toggleShowFormModal = () => {
        setShowFormModal(!showFormModal)
    }

    const updateRolesAndPermission = (rolesAndPermissionType?: RolesAndPermissionType, id?: string) => {
        console.log(id)

        if (rolesAndPermissionType !== undefined) {
            if (id === undefined) {
                setRolesAndPermission((prevRolesAndPermission) => [...prevRolesAndPermission, rolesAndPermissionType]);
            } else {
                setRolesAndPermission((prevRolesAndPermission) => [...prevRolesAndPermission.map(prevRoleAndPermission => {
                    {
                        if (prevRoleAndPermission.ID === id) {
                            return rolesAndPermissionType
                        }
                        return prevRoleAndPermission;
                    }
                })])
            }
        } else {
            setRolesAndPermission((prevRolesAndPermission) =>
                [...prevRolesAndPermission.filter(prevRoleAndPermission => prevRoleAndPermission.ID !== id)])
        }
    }

    return (
        <RolesAndPermissionContext.Provider
            value={{rolesAndPermission, isLoading, showFormModal, toggleShowFormModal, updateRolesAndPermission, getRoleAndPermission}}>
            {children}
        </RolesAndPermissionContext.Provider>
    )
}
export const useRolesAndPermissionContext = () => useContext(RolesAndPermissionContext);
