'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import {CustomerType} from "@/types/customerType";
import DataTable from "@/components/general/DataTable/DataTable";
import {useState} from "react";
import {useCustomerContext} from "@/context/customer.context";
import {CustomerFormModal} from "@/components/customers/CustomerFormModal";
import {Button, message} from "antd";
import {deleteCustomer} from "@/services/customer/CustomerService";

export default function Page() {
    const [rows, setRows] = useState<CustomerType[]>([]);

    const columns: DataTableColumnType[] = [
        {
            name: "firstName",
            title: "Firstname"
        },
        {
            name: "lastName",
            title: "Lastname"
        },
        {
            name: "phoneNumber",
            title: "PhoneNumber"
        }
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
    ]

    const {customers, toggleShowFormModal, setSelectedID, updateCustomer} = useCustomerContext();

    const addBtn = <Button type={"primary"} onClick={toggleShowFormModal}>Add</Button>;

    const edit = (id: string) => {
        setSelectedID(id)
        toggleShowFormModal()
    }

    const deleteAction = (id: string) => {
        deleteCustomer(id).then(r => {
            message.success("Deleted customer")
            setSelectedID(undefined)
            updateCustomer(undefined, id)
        });
    }

    return <>
        <DataTable columns={columns} rows={customers} size={10} addBtn={addBtn} editAction={edit} deleteAction={deleteAction}/>
        <CustomerFormModal/>
    </>
}
