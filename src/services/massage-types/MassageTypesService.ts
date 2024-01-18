import axios from "axios";
import {API_URL, TOKEN} from "@/services/ApiService";
import {MassageType, MassageTypePrice} from "@/types/massageType";
import { MassageFormCreateType } from "@/components/massage-types/MassageTypeCreateForm";

export async function getMassageTypes(): Promise<MassageType[]> {
    const response = await axios.get(API_URL + "/appointment/type", {headers: {'Authorization': 'Bearer ' + TOKEN}});
    if (response?.data?.success) {
        // @ts-ignore
        return response?.data?.types?.map(type => {
            return {
                ID: type._id,
                name: type.name,
                price: type.price
            }
        })
    }
    return []
}

export async function createMassageType(data: MassageFormCreateType) {
    const response = await axios.post(API_URL + "/appointment/type/create", data, {headers: {'Authorization': 'Bearer ' + TOKEN}});
    return {
        ID: response?.data?.createdAppointmentType?._id,
        name: response?.data?.createdAppointmentType?.name,
        price: response?.data?.createdAppointmentType?.price,
    }
}

export async function updateNameMassageType(id: string, name: string) {
    const response = await axios.patch(API_URL + "/appointment/type/" + id + "/name", {name}, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return {
        ID: response?.data?.updatedAppointmentType?._id,
        name: response?.data?.updatedAppointmentType?.name,
        price: response?.data?.updatedAppointmentType?.price,
    }
}

export async function updatePriceMassageType(id: string, price: number, activeFrom: Date) {
    const response = await axios.patch(API_URL + "/appointment/type/" + id + "/price", {price, activeFrom}, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return {
        ID: response?.data?.updatedAppointmentType?._id,
        name: response?.data?.updatedAppointmentType?.name,
        price: response?.data?.updatedAppointmentType?.price,
    }
}

export async function getMassageTypePrices(id: string): Promise<MassageTypePrice[]> {
    const response = await axios.get(API_URL + "/appointment/type/" + id + "/prices", {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return response?.data?.prices?.map((price: any) => {
        return {
            price: price.price,
            activeFrom: price.activeFrom
        }
    })
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