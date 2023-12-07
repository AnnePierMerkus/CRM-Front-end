"use client";

import React from "react";
import { AutoForm } from "uniforms-antd";
import { bridge as schema, CustomerFormType } from "./CustomerBaseFormSchema";
import { CustomerType, SelectedCustomerType } from "@/types/customerType";

export const CustomerBaseForm = ({
                                     onSubmit,
                                     selected,
                                     id,
                                 }: {
    onSubmit: (data: CustomerFormType, id?: string | undefined) => void;
    selected?: CustomerType;
    id?: string | undefined;
}) => {
//   const error = ({ response }: { response: { data: { message: string } } }) => {
//     message.error(response.data.message);
//   };
    // const onSubmit = (data: CustomerFormType) => {
    // if (selected !== undefined) {
    //     updateCustomerCall(selected.ID, data).then(updatedCustomer => {
    //         updateCustomer(updatedCustomer, selected.ID);
    //         setSelectedID();
    //         removeLastFromStack();
    //         message.success("Updated customer '" + (updatedCustomer.firstName + " " + updatedCustomer.lastName) + "'")
    //     })
    // } else {
    //     createCustomer(data).then(newCustomer => {
    //         updateCustomer(newCustomer)
    //         removeLastFromStack();
    //         message.success("Created customer '" + (newCustomer.firstName + " " + newCustomer.lastName) + "'")
    //     }).catch(error)
    // }
    // }


    return <AutoForm schema={schema} onSubmit={(model: any) => onSubmit(model, id)} model={selected} />;
};
