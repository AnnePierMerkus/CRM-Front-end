'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import {CustomerType} from "@/types/customerType";
import DataTable from "@/components/general/DataTable/DataTable";
import {CustomerBaseForm} from "@/components/customers/CustomerBaseForm";
import { Button } from 'antd';

export default function Page() {
    const columns: DataTableColumnType[] = [
        {
            name: "firstname",
            title: "Firstname"
        },
        {
            name: "lastname",
            title: "Lastname"
        },
        {
            name: "lastEmployee",
            title: "lastEmployee"
        },
        {
            name: "lastType",
            title: "lastType"
        },
        {
            name: "options",
            title: "options"
        }
    ]

    const rows: CustomerType[] = [...Array(100)].map((x, i) => {
        return {
            ID: i,
            firstname: `firstname ${i}`,
            lastname:  `firstname ${i}`,
            lastEmployee: 'last employee',
            lastType: 'type',
            options: 'options'
        }
    })

    const form = () => {
        return <CustomerBaseForm />
    }


    return <>
        <DataTable columns={columns} rows={rows} size={10} form={form()} add={true}/>
    </>
}
