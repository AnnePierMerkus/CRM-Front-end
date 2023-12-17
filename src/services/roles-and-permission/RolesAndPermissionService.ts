import axios from "axios";
import {API_URL, TOKEN} from "@/services/ApiService";
import {RolesAndPermissionType} from "@/types/roles-and-permission-type";
import {RolesAndPermissionFormType} from "@/components/roles-and-permissions/RolesAndPermissionBaseFormSchema";

export async function getRolesAndPermission(): Promise<RolesAndPermissionType[]> {
    const response = await axios.get(API_URL + "/roles", {headers: {'Authorization': 'Bearer ' + TOKEN}});
    // @ts-ignore
    return response?.data?.map(rolesAndPermission => {
        return {
            ID: rolesAndPermission?._id,
            name: rolesAndPermission?.name,
            bookings: rolesAndPermission?.bookings,
            employees: rolesAndPermission?.employees,
            customers: rolesAndPermission?.customers,
            massageTypes: rolesAndPermission?.massageTypes,
            salaries: rolesAndPermission?.salaries,
            bookingHistory: rolesAndPermission?.bookingHistory,
            roles: rolesAndPermission?.roles,
        }
    })
}

export async function createRolesAndPermission(data: RolesAndPermissionFormType) {
    const response = await axios.post(API_URL + "/roles/create", data, {headers: {'Authorization': 'Bearer ' + TOKEN}});
    return {
        ID: response?.data?.rolesAndPermission?._id,
        name: response?.data?.rolesAndPermission?.name,
        bookings: response?.data?.rolesAndPermission?.bookings,
        employees: response?.data?.rolesAndPermission?.employees,
        customers: response?.data?.rolesAndPermission?.customers,
        massageTypes: response?.data?.rolesAndPermission?.massageTypes,
        salaries: response?.data?.rolesAndPermission?.salaries,
        bookingHistory: response?.data?.rolesAndPermission?.bookingHistory,
        roles: response?.data?.rolesAndPermission?.roles,
    }
}

export async function updateRolesAndPermission(id: string, data: RolesAndPermissionFormType) {
    const response = await axios.put(API_URL + "/roles/" + id, data, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return {
        ID: response?.data?.rolesAndPermission?._id,
        name: response?.data?.rolesAndPermission?.name,
        bookings: response?.data?.rolesAndPermission?.bookings,
        employees: response?.data?.rolesAndPermission?.employees,
        customers: response?.data?.rolesAndPermission?.customers,
        massageTypes: response?.data?.rolesAndPermission?.massageTypes,
        salaries: response?.data?.rolesAndPermission?.salaries,
        bookingHistory: response?.data?.rolesAndPermission?.bookingHistory,
        roles: response?.data?.rolesAndPermission?.roles,
    }
}

export async function deleteRolesandPermission(id: string) {
    const response = await axios.delete(API_URL + "/roles/" + id, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return {
        ID: response?.data?.rolesAndPermission?._id,
        name: response?.data?.rolesAndPermission?.name,
        bookings: response?.data?.rolesAndPermission?.bookings,
        employees: response?.data?.rolesAndPermission?.employees,
        customers: response?.data?.rolesAndPermission?.customers,
        massageTypes: response?.data?.rolesAndPermission?.massageTypes,
        salaries: response?.data?.rolesAndPermission?.salaries,
        bookingHistory: response?.data?.rolesAndPermission?.bookingHistory,
        roles: response?.data?.rolesAndPermission?.roles,
    }
}