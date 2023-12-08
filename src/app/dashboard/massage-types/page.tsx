'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import {MassageTypeBaseForm} from "@/components/massage-types/MassageTypeBaseForm";
import { Button } from 'antd';
import {MassageType} from "@/types/massageType";
import {useState} from "react";
import {CustomerType} from "@/types/customerType";
import {useCustomerContext} from "@/context/customer.context";
import {useMassageTypeContext} from "@/context/massage-types.context";

export default function Page() {
    const [rows, setRows] = useState<MassageType[]>([]);

    const columns: DataTableColumnType[] = [
        {
            name: "name",
            title: "Name"
        },
        {
            name: "price",
            title: "Price"
        },
        {
            name: "newPrice",
            title: "New Price"
        }

    ]

    const { massageTypes } =
        useMassageTypeContext();
    // const rows: MassageType[] = [...Array(100)].map((x, i) => {
    //     return {
    //         ID: i,
    //         name: `type ${i}`,
    //         price: '100 MYR',
    //         newPrice: '150 MYR (starting 1st of January 2024)'
    //     }
    // })


    const form = () => {
        return <MassageTypeBaseForm />
    }


    return <>
        <DataTable columns={columns} rows={massageTypes} size={15} form={form()} add={true} edit={true} canDelete={true}/>
    </>
}
