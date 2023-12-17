import axios from "axios";
import {API_URL, TOKEN} from "@/services/ApiService";
import {MassageType} from "@/types/massageType";
import {MassageFormType} from "@/components/massage-types/MassageTypeBaseFormSchema";

export async function getMassageTypes(): Promise<MassageType[]> {
    const response = await axios.get(API_URL + "/appointment/type", {headers: {'Authorization': 'Bearer ' + TOKEN}});
    if (response?.data?.success) {
        // @ts-ignore
        return response?.data?.types?.map(type => {
            return {
                ID: type._id,
                name: type.name,
                price: type.price,
                newPrice: type.newPrice,
                activationDate: type.activationDate,
            }
        })
    }
    return []
}

export async function createMassageType(data: MassageFormType) {
    const response = await axios.post(API_URL + "/appointment/type/create", data, {headers: {'Authorization': 'Bearer ' + TOKEN}});
    return {
        ID: response?.data?.createdAppointmentType?._id,
        name: response?.data?.createdAppointmentType?.name,
        price: response?.data?.createdAppointmentType?.price,
        newPrice: response?.data?.createdAppointmentType?.newPrice,
        activationDate: response?.data?.createdAppointmentType?.activationDate,
    }
}

export async function updateMassageType(id: String, data: MassageFormType) {
    const response = await axios.put(API_URL + "/appointment/type/" + id, data, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return {
        ID: response?.data?.appointmentType?._id,
        name: response?.data?.appointmentType?.name,
        price: response?.data?.appointmentType?.price,
        newPrice: response?.data?.appointmentType?.newPrice,
        activationDate: response?.data?.appointmentType?.activationDate
    }
}

export async function deleteMassageType(id: string) {
    const response = await axios.delete(API_URL + "/appointment/type/" + id, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return {
        ID: response?.data?.appointmentType?._id,
        name: response?.data?.appointmentType?.name,
        price: response?.data?.appointmentType?.price,
        newPrice: response?.data?.appointmentType?.newPrice,
        activationDate: response?.data?.appointmentType?.activationDate
    }
}