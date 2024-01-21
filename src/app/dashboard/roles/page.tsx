'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import {RolesAndPermissionBaseForm} from "@/components/roles-and-permissions/RolesAndPermissionBaseForm";
import {useModalContext} from "@/context/modal.context";
import {useRolesAndPermissionContext} from "@/context/roles-and-permission.context";
import {
    createRolesAndPermission,
    deleteRolesandPermission,
    getRolesAndPermission,
    updateRolesAndPermission as updateRolesAndPermissionCall
} from "@/services/roles-and-permission/RolesAndPermissionService";
import {RolesAndPermissionFormType} from "@/components/roles-and-permissions/RolesAndPermissionBaseFormSchema";
import {Button, message} from "antd";
import {deleteMassageType} from "@/services/massage-types/MassageTypesService";

export default function Page() {
    const { addToStack, removeLastFromStack } = useModalContext();
    const columns: DataTableColumnType[] = [
        {
            name: "name",
            title: "Role"
        },
        {
            name: "bookings",
            title: "Bookings"
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
            name: "massageTypes",
            title: "Massage Types"
        },
        {
            name: "salaries",
            title: "Salaries"
        },
        {
            name: "bookingHistory",
            title: "Booking History"
        },
        {
            name: "roles",
            title: "Roles"
        },

    ]

    const { rolesAndPermission, updateRolesAndPermission, getRoleAndPermission } =
        useRolesAndPermissionContext();


    const create = (data: RolesAndPermissionFormType) => {
        createRolesAndPermission(data).then((newRolesAndPermission) => {
            updateRolesAndPermission(newRolesAndPermission);
            message.success(
                "Created role '" +
                (newRolesAndPermission.name) +
                "'"
            );
            removeLastFromStack();
        });
    }

    const editAction = (data: RolesAndPermissionFormType, id?: string) => {
        console.log(id)

        if (id !== undefined)
            updateRolesAndPermissionCall(id, data).then((updatedRolesAndPermission) => {
                updateRolesAndPermission(updatedRolesAndPermission, id);
                removeLastFromStack();
                message.success(
                    "Updated role '" +
                    (updatedRolesAndPermission.name) +
                    "'"
                );
            });
    }

    const showModal = () => {
        addToStack("Add role", <RolesAndPermissionBaseForm onSubmit={create} />);
    }

    const addBtn = (
        <Button type={"primary"} onClick={showModal}>
            Add
        </Button>
    );

    const edit = (id: string) => {
        addToStack("Edit role", <RolesAndPermissionBaseForm onSubmit={editAction} selected={getRoleAndPermission(id)} id={id} />);
    };

    const deleteAction = (id: string) => {
        deleteRolesandPermission(id).then((r) => {
            message.success("Deleted role");
            updateRolesAndPermission(undefined, id);
        });
    };


    return <>
        <DataTable columns={columns} rows={rolesAndPermission} size={10} addBtn={addBtn} editAction={edit} deleteAction={deleteAction}/>
    </>
}
