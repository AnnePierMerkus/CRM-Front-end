'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import {MassageTypeBaseForm} from "@/components/massage-types/MassageTypeBaseForm";
import { Button } from 'antd';
import {InvoiceType} from "@/types/invoiceType";

export default function Page() {
    const columns: DataTableColumnType[] = [
        {
            name: "name",
            title: "Name"
        },
        {
            name: "date",
            title: "Date"
        },
        {
            name: "employee",
            title: "Employee"
        },
        {
            name: "customer",
            title: "Customer",
        },
        {
            name: "type",
            title: "Type",
        },
        {
            name: "discount",
            title: "Discount",
        }
    ]

    const rows: InvoiceType[] = [...Array(100)].map((x, i) => {
        return {
            ID: i,
            name: `Invoice ${i}`,
            date: 'January 5th, 2024',
            employee: 'Steve Hennessy',
            customer: 'Pierre Merkus',
            type: "Full body",
            discount: "100%"
        }
    })

    const form = () => {
        return <MassageTypeBaseForm />
    }


    return <>
        <DataTable columns={columns} rows={rows} size={10} form={form()} add={false} edit={true} canDelete={true}/>
    </>
}
