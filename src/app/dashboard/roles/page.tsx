'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import {RolesAndPermissionBaseForm} from "@/components/roles-and-permissions/RolesAndPermissionBaseForm";
import { Button } from 'antd';
import {RolesAndPermissionType} from "@/types/roles-and-permission-type";

export default function Page() {
    const columns: DataTableColumnType[] = [
        {
            name: "role",
            title: "Role"
        },
        {
            name: "employees",
            title: "Employees"
        },
        {
            name: "customers",
            title: "Customers"
        },
        {
            name: "roles",
            title: "Roles"
        }

    ]

    const rows: RolesAndPermissionType[] = [...Array(3)].map((x, i) => {
        return {
            ID: i,
            role: `secretary`,
            employees: 'View',
            customers: 'View and edit',
            roles: 'None'
        }
    })

    const form = () => {
        return <RolesAndPermissionBaseForm />
    }


    return <>
        <DataTable columns={columns} rows={rows} size={10} form={form()} add={true} edit={true} canDelete={true}/>
    </>
}
