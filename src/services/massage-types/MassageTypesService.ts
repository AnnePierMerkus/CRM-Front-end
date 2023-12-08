import {EmployeeType} from "@/types/employeeType";
import axios from "axios";
import {API_URL, TOKEN} from "@/services/ApiService";
import {MassageType} from "@/types/massageType";
import {CustomerFormType} from "@/components/customers/CustomerBaseFormSchema";

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

export async function createMassageType(data: MassageType) {
    const response = await axios.post(API_URL + "/appointment/type/create", data, {headers: {'Authorization': 'Bearer ' + TOKEN}});
    return {
        ID: response?.data?.type?._id,
        name: response?.data?.type?.name,
        price: response?.data?.type?.lastName,
        newPrice: response?.data?.type?.phoneNumber,
        activationDate: response?.data?.type?.activationDate,
    }
}