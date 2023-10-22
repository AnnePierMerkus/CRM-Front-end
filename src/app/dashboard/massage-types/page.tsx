'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import {MassageTypeBaseForm} from "@/components/massage-types/MassageTypeBaseForm";
import { Button } from 'antd';
import {MassageType} from "@/types/massageType";

export default function Page() {
    const columns: DataTableColumnType[] = [
        {
            name: "name",
            title: "Name"
        },
        {
            name: "currentPrice",
            title: "Current Price"
        },
        {
            name: "newPrice",
            title: "New Price"
        }

    ]

    const rows: MassageType[] = [...Array(100)].map((x, i) => {
        return {
            ID: i,
            name: `type ${i}`,
            currentPrice: '100 MYR',
            newPrice: '150 MYR (starting 1st of January 2024)'
        }
    })

    const form = () => {
        return <MassageTypeBaseForm />
    }


    return <>
        <DataTable columns={columns} rows={rows} size={10} form={form()} add={true} edit={true} canDelete={true}/>
    </>
}
