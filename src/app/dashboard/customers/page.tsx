"use client";

import { DataTableColumnType } from "@/types/data-table-column-type";
import { CustomerType } from "@/types/customerType";
import DataTable from "@/components/general/DataTable/DataTable";
import { useState } from "react";
import { useCustomerContext } from "@/context/customer.context";
import { Button, message } from "antd";
import { createCustomer, deleteCustomer, updateCustomer as updateCustomerCall } from "@/services/customer/CustomerService";
import { useModalContext } from "@/context/modal.context";
import { CustomerBaseForm } from "@/components/customers/CustomerBaseForm";
import { CustomerFormType } from "@/components/customers/CustomerBaseFormSchema";

export default function Page() {
    const columns: DataTableColumnType[] = [
        {
            name: "firstName",
            title: "Firstname",
        },
        {
            name: "lastName",
            title: "Lastname",
        },
        {
            name: "phoneNumber",
            title: "PhoneNumber",
        },
        // {
        //     name: "lastEmployee",
        //     title: "lastEmployee"
        // },
        // {
        //     name: "lastType",
        //     title: "lastType"
        // },
        // {
        //     name: "options",
        //     title: "options"
        // }
    ];

    const { customers, setSelectedID, updateCustomer, getCustomer } =
        useCustomerContext();
    const { addToStack, removeLastFromStack } = useModalContext();

    const create = (data: CustomerFormType) => {
        createCustomer(data).then((newCustomer) => {
            updateCustomer(newCustomer);
            message.success(
                "Created customer '" +
                (newCustomer.firstName + " " + newCustomer.lastName) +
                "'"
            );
            removeLastFromStack();
        });
    }

    const editAction = (data: CustomerFormType, id?: string) => {
        if (id !== undefined)
            updateCustomerCall(id, data).then((updatedCustomer) => {
                updateCustomer(updatedCustomer, id);
                removeLastFromStack();
                message.success(
                    "Updated customer '" +
                    (updatedCustomer.firstName + " " + updatedCustomer.lastName) +
                    "'"
                );
            });
    }

    const showModal = () => {
        addToStack("Add customer", <CustomerBaseForm onSubmit={create} />);
    }

    const addBtn = (
        <Button type={"primary"} onClick={showModal}>
            Add
        </Button>
    );

    const edit = (id: string) => {
        addToStack("Edit customer", <CustomerBaseForm onSubmit={editAction} selected={getCustomer(id)} id={id} />);
    };

    const deleteAction = (id: string) => {
        deleteCustomer(id).then((r) => {
            message.success("Deleted customer");
            setSelectedID(undefined);
            updateCustomer(undefined, id);
        });
    };

    return (
        <>
            <DataTable
                columns={columns}
                rows={customers}
                size={10}
                addBtn={addBtn}
                editAction={edit}
                deleteAction={deleteAction}
            />
        </>
    );
}
