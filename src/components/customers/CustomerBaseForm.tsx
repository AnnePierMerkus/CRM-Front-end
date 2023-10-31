'use client';

import React from 'react';
import {AutoForm} from "uniforms-antd";
import {bridge as schema, CustomerFormType} from './CustomerBaseFormSchema';
import {createCustomer, updateCustomer as updateCustomerCall} from "@/services/customer/CustomerService";
import {message} from "antd";
import {useCustomerContext} from "@/context/customer.context";

export const CustomerBaseForm = () => {
    const {toggleShowFormModal, updateCustomer, selected, setSelectedID} = useCustomerContext();

    const error = ({response}: { response: { data: { message: string } } }) => {
        message.error(response.data.message)
    }
    const onSubmit = (data: CustomerFormType) => {
        if (selected !== undefined) {
            updateCustomerCall(selected.ID, data).then(updatedCustomer => {
                updateCustomer(updatedCustomer, selected.ID);
                setSelectedID();
                toggleShowFormModal()
                message.success("Updated customer '" + (updatedCustomer.firstName + " " + updatedCustomer.lastName) + "'")
            })
        } else {
            createCustomer(data).then(newCustomer => {
                updateCustomer(newCustomer)
                toggleShowFormModal()
                message.success("Created customer '" + (newCustomer.firstName + " " + newCustomer.lastName) + "'")
            }).catch(error)
        }

    }

    return <AutoForm schema={schema} onSubmit={onSubmit} model={selected?.data}/>
};
