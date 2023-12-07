'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import {MassageTypeBaseForm} from "@/components/massage-types/MassageTypeBaseForm";
import { Button } from 'antd';
import {MassageType} from "@/types/massageType";
import {SalaryType} from "@/types/salaryType";

export default function Page() {
    const columns: DataTableColumnType[] = [
        {
            name: "employee",
            title: "Employee"
        },
        {
            name: "hoursWorked",
            title: "Hours worked"
        },
        {
            name: "salary",
            title: "Salary"
        }

    ]

    const rows: SalaryType[] = [...Array(100)].map((x, i) => {
        return {
            ID: i,
            employee: `employee ${i}`,
            hoursWorked: '100 hours',
            salary: '1000 MYR'
        }
    })


    return <>
        <DataTable columns={columns} rows={rows} size={15} />
    </>
}
