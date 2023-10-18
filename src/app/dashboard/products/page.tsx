'use client';

import DataTable from "@/components/general/DataTable/DataTable";
import {DataTableColumnType} from "@/types/data-table-column-type";
import {ProductType} from "@/types/product-type";

export default function Page() {

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
            name: "description",
            title: "Beschrijving"
        }
    ]

    const rows: ProductType[] = [...Array(100)].map((x, i) => {
        return {
            ID: i,
            name: `test${i}`,
            price: 10 * i,
            description: "Dit is een beschrijving van het product"
        }
    })

    return <>
        <DataTable columns={columns} rows={rows} size={10}/>
    </>
}