'use client';

import axios from "axios";
import {API_URL, TOKEN} from "@/services/ApiService";
import {CustomerType} from "@/types/customerType";
import {CustomerFormType} from "@/components/customers/CustomerBaseFormSchema";

export async function customers() {
    const response = await axios.get(API_URL + "/customer", {headers: {'Authorization': 'Bearer ' + TOKEN}});
    // @ts-ignore
    return response?.data?.map(customer => {
        console.log("hi")
        const c: CustomerType = {
            ID: customer?._id,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            phoneNumber: customer?.phoneNumber
        }
        return c
    })
}

export async function createCustomer(data: CustomerFormType) {
    const response = await axios.post(API_URL + "/customer/create", data, {headers: {'Authorization': 'Bearer ' + TOKEN}});
    return {
        ID: response?.data?.customer?._id,
        firstName: response?.data?.customer?.firstName,
        lastName: response?.data?.customer?.lastName,
        phoneNumber: response?.data?.customer?.phoneNumber
    }
}

export async function updateCustomer(id: String, data: CustomerFormType) {
    const response = await axios.put(API_URL + "/customer/" + id, data, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return {
        ID: response?.data?.customer?._id,
        firstName: response?.data?.customer?.firstName,
        lastName: response?.data?.customer?.lastName,
        phoneNumber: response?.data?.customer?.phoneNumber
    }
}

export async function deleteCustomer(id: string) {
    const response = await axios.delete(API_URL + "/customer/" + id, {headers: {'Authorization': 'Bearer ' + TOKEN}})
    return {
        ID: response?.data?.customer?._id,
        firstName: response?.data?.customer?.firstName,
        lastName: response?.data?.customer?.lastName,
        phoneNumber: response?.data?.customer?.phoneNumber
    }
}
