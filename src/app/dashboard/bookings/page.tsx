'use client';

import { DataTableColumnType } from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import { MassageTypeBaseForm } from "@/components/massage-types/MassageTypeBaseForm";
import { MassageType } from "@/types/massageType";
import { useState } from 'react';

export default function Page() {
    const columns: DataTableColumnType[] = [
        {
            name: "name",
            title: "Name"
        },
        {
            name: "currentPrice",
            title: "Current Price"
        }
    ]

    const form = () => {
        return <MassageTypeBaseForm />
    }

    const initialRows: MassageType[] = [...Array(100)].map((x, i) => {
        return {
            ID: i,
            name: `employee ${i}`,
            currentPrice: '100 MYR',
            newPrice: '150 MYR (starting 1st of January 2024)'
        }
    });



    const [rows, setRows] = useState(initialRows);

    const handleDateSelect = (date: string, dateString: string) => {
        // The selected date is passed as a string in the 'dateString' parameter
        console.log(dateString);

        // You can conditionally filter or modify the 'rows' data based on the selected date
        // For example, if dateString is '2024-01-01', show different data
        if (dateString === '2024-01-01') {
            // Modify 'rows' data to show different information
            const modifiedRows = [...Array(100)].map((x, i) => {
                return {
                    ID: i,
                    name: `employee ${i}`,
                    currentPrice: '120 MYR',
                    newPrice: '160 MYR (starting 1st of January 2024)'
                }
            });

            // Update the 'rows' state with the modified data
            setRows(modifiedRows);
        } else {
            // If a different date is selected, you can update 'rows' with the original data
            setRows(initialRows);
        }
    };

    return <>
        <DataTable columns={columns} rows={rows} size={10} form={form()} add={true} edit={true} canDelete={true} selectDate={true}  handleDateSelect={handleDateSelect}/>
    </>
}
